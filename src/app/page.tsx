"use client";

import React, { useRef, useState, useEffect } from 'react';
import ProjectGallery from './components/ProjectGallery';
import emailjs from '@emailjs/browser';
// Import data from separate files
import { Project, projects } from '../data/projects';
import { personalInfo } from '../data/personalInfo';
import { skills } from '../data/skills';


// Declare global grecaptcha type
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    grecaptcha: any;
  }
}

// Main App component for the portfolio
function App() {
  // State to manage which project case study is currently open
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
    isVisible: boolean;
  }>({ message: '', type: 'success', isVisible: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useRef<HTMLFormElement | null>(null);
  const emailJsPublicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';
  const emailJsServiceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
  const emailJsTemplateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || 'YOUR_RECAPTCHA_SITE_KEY';

  // Load reCAPTCHA script on component mount
  useEffect(() => {
    const loadRecaptcha = () => {
      if (!window.grecaptcha && recaptchaSiteKey !== 'YOUR_RECAPTCHA_SITE_KEY') {
        const script = document.createElement('script');
        script.src = `https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      }
    };
    loadRecaptcha();
  }, [recaptchaSiteKey]);

  // Function to handle opening a project case study
  const handleOpenProject = (projectId: string): void => {
    setOpenProject(projects.find(p => p.id === projectId) || null);
  };

  // Function to handle closing a project case study
  const handleCloseProject = (): void => {
    setOpenProject(null);
  };

  // Function to show notification
  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type, isVisible: true });
    // Auto dismiss after 5 seconds
    setTimeout(() => {
      setNotification(prev => ({ ...prev, isVisible: false }));
    }, 5000);
  };

  // Function to dismiss notification
  const dismissNotification = () => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  };  // Contact form submission handler with reCAPTCHA
  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (form.current) {
        // Extract form data
        const formData = new FormData(form.current);
        // Create template parameters object
        const templateParams: Record<string, string> = {
          name: formData.get('name') as string,
          email: formData.get('email') as string,
          title: formData.get('title') as string,
          message: formData.get('message') as string,
        };        // Execute reCAPTCHA v3 if enabled
        if (window.grecaptcha && recaptchaSiteKey !== 'YOUR_RECAPTCHA_SITE_KEY') {
          // Get reCAPTCHA token
          const token = await new Promise<string>((resolve, reject) => {
            window.grecaptcha.ready(() => {
              window.grecaptcha.execute(recaptchaSiteKey, { action: 'contact_form' })
                .then(resolve)
                .catch(reject);
            });
          });

          // Verify token with server-side API
          const verifyResponse = await fetch('/api/verify-recaptcha', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token }),
          });
          
          const verifyResult = await verifyResponse.json();
          
          if (!verifyResult.success) {
            throw new Error(`reCAPTCHA verification failed: ${verifyResult.error}`);
          }          // Send email after successful verification (without token in parameters)
          await emailjs.send(emailJsServiceId, emailJsTemplateId, templateParams, {
            publicKey: emailJsPublicKey,
          });
        } else {
          // Fallback without reCAPTCHA - use sendForm for better compatibility
          await emailjs.sendForm(emailJsServiceId, emailJsTemplateId, form.current, {
            publicKey: emailJsPublicKey,
          });
        }

        showNotification("Thank you for your message! I'll get back to you soon.", 'success');
        form.current.reset();
      }
    } catch (error) {
      console.error('Form submission error:', error);
      showNotification("Sorry, there was an error sending your message. Please try again or contact me directly via email.", 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-inter text-gray-800 antialiased">
      {/* Notification */}
      {notification.isVisible && (
        <div className={`fixed top-4 right-4 z-50 max-w-sm w-full ${notification.type === 'success'
          ? 'bg-green-100 border-green-500 text-green-700'
          : 'bg-red-100 border-red-500 text-red-700'
          } border-l-4 p-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform`}>
          <div className="flex justify-between items-start">
            <div className="flex">
              <div className="flex-shrink-0">
                {notification.type === 'success' ? (
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{notification.message}</p>
              </div>
            </div>
            <button
              onClick={dismissNotification}
              className="ml-4 inline-flex text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Header/Hero Section */}
      <header className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20 px-4 sm:px-6 lg:px-8 shadow-lg rounded-b-3xl">
        <div className="max-w-7xl mx-auto text-center">
          {/* profile image here */}
          <div className="mb-8">
            <img
              src={personalInfo.photo}
              alt="Profile"
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-white shadow-lg object-cover mx-auto"
            />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 rounded-lg p-2 inline-block bg-white/15">
            {personalInfo.name}
          </h1>
          <p className="text-xl sm:text-2xl lg:text-3xl font-light mb-6">
            {personalInfo.title}
          </p>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto mb-8 leading-relaxed">
            {personalInfo.tagline}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => {
                // Smooth scroll to projects section
                const projectsSection = document.getElementById('projects');
                if (projectsSection) {
                  projectsSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-white text-blue-700 hover:bg-blue-100 px-8 py-3 rounded-full text-lg font-semibold shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            >
              View My Projects
            </button>
            <a
              href={personalInfo.resume}
              download={personalInfo.resumeName}
              className="bg-purple-600 text-white hover:bg-purple-700 px-8 py-3 rounded-full text-lg font-semibold shadow-md transition duration-300 ease-in-out transform hover:scale-105 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Resume
            </a>
          </div>
        </div>

        {/* Social/Professional Links */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-6">
          <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-200 transition duration-300">
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
            </svg>
          </a>
          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-200 transition duration-300">
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 0C5.372 0 0 5.372 0 12c0 5.303 3.438 9.8 8.207 11.387.6.11.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.043-1.609-4.043-1.609-.546-1.387-1.333-1.755-1.333-1.755-1.09-.745.08-.73.08-.73 1.205.085 1.838 1.238 1.838 1.238 1.07 1.833 2.81 1.304 3.492.997.108-.775.42-1.304.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.12-.3-.535-1.52.117-3.176 0 0 1-.32 3.3-.993 1.03-.283 2.12-.425 3.22-.425 1.1 0 2.19.142 3.22.425 2.298.673 3.3 1 3.3 1 .653 1.656.238 2.876.118 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.805 5.62-5.475 5.92.43.37.81 1.104.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .318.22.69.825.577C20.565 21.8 24 17.303 24 12c0-6.628-5.372-12-12-12z" clipRule="evenodd" />
            </svg>
          </a>
          <a href={`mailto:${personalInfo.email}`} className="text-white hover:text-blue-200 transition duration-300">
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M2.003 5.884L10.5 11.416l8.497-5.532C18.254 5.373 17.06 5 15.75 5H8.25c-1.29 0-2.484.373-3.497.884zM22 8.003v9.994c0 1.104-.896 2.003-2.003 2.003H4.003C2.896 20.003 2 19.104 2 18.003V8.003l8.497 5.532c.18.117.39.175.61.175s.43-.058.61-.175L22 8.003z" />
            </svg>
          </a>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* About Me / My Expertise Section */}
        <section className="mb-20 bg-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 text-center">About Me & My Expertise</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8 text-center max-w-4xl mx-auto">
            {personalInfo.intro}
          </p>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} className="bg-gray-100 p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold text-blue-700 mb-4">{category}</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  {items.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <svg className="w-4 h-4 text-purple-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-10 text-center">My Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map(project => (
              <div
                key={project.id}
                className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                onClick={() => handleOpenProject(project.id)}
              >
                <div className="text-5xl mb-4 text-center">{project.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">{project.title}</h3>
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">{project.shortDesc}</p>
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
                <button className="w-full bg-blue-600 text-white py-2 rounded-full font-semibold hover:bg-blue-700 transition duration-300">
                  View Case Study
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Project Case Study Modal/Section */}
        {openProject && (
          <div className="fixed inset-0 bg-black/75 flex items-center justify-center p-4 z-50 overflow-y-auto" onClick={handleCloseProject}>
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
              <button
                onClick={handleCloseProject}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-3xl font-bold"
              >
                &times;
              </button>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">{openProject.title}</h3>
              <p className="text-sm text-gray-600 mb-4">
                <strong>Role:</strong> {openProject.caseStudy.role}
              </p>
              <div className="mb-4">
                <h4 className="text-lg font-semibold text-blue-700 mb-2">Technologies Used:</h4>
                <div className="flex flex-wrap gap-2">
                  {openProject.technologies.map((tech, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <h4 className="text-lg font-semibold text-blue-700 mb-2">The Challenge:</h4>
                <p className="text-gray-700 leading-relaxed">{openProject.caseStudy.challenge}</p>
              </div>
              <div className="mb-4">
                <h4 className="text-lg font-semibold text-blue-700 mb-2">My Solution & Contribution:</h4>
                <p className="text-gray-700 leading-relaxed">{openProject.caseStudy.solution}</p>
              </div>
              <div className="mb-4">
                <h4 className="text-lg font-semibold text-blue-700 mb-2">Impact & Results:</h4>
                <p className="text-gray-700 leading-relaxed">{openProject.caseStudy.impact}</p>
              </div>
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-blue-700 mb-2">Key Learnings:</h4>
                <p className="text-gray-700 leading-relaxed">{openProject.caseStudy.learnings}</p>
              </div>
              {/* Project Gallery Component */}
              {openProject.images && openProject.images.length > 0 && (
                <div className="mb-6">
                  <ProjectGallery
                    projectId={openProject.id}
                    images={openProject.images}
                    title={openProject.title}
                    className="mb-6"
                  />
                </div>
              )}
              <p className="text-sm text-gray-500 italic">
                *Some images are representative examples. Due to client confidentiality, actual screenshots may differ or be limited.*
              </p>
            </div>
          </div>
        )}

        {/* Contact Section */}
        <section className="bg-white p-8 rounded-2xl shadow-xl">          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 text-center">Let&apos;s Connect</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8 text-center max-w-3xl mx-auto">
            I&apos;m always open to new opportunities and collaborations. Feel free to reach out!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-gray-100 p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-blue-700 mb-4">Send Me a Message</h3>
              <form ref={form} onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    disabled={isSubmitting}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    disabled={isSubmitting}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    disabled={isSubmitting}
                    placeholder="What's this about?"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    disabled={isSubmitting}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-purple-600 text-white py-2 rounded-full font-semibold hover:bg-purple-700 transition duration-300 shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
                {recaptchaSiteKey !== 'YOUR_RECAPTCHA_SITE_KEY' && (
                  <p className="text-xs text-gray-500 text-center">
                    This site is protected by reCAPTCHA and the Google{' '}
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Privacy Policy
                    </a>{' '}
                    and{' '}
                    <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Terms of Service
                    </a>{' '}
                    apply.
                  </p>
                )}
              </form>
            </div>

            {/* Direct Contact Info */}
            <div className="bg-gray-100 p-6 rounded-xl shadow-md flex flex-col justify-center items-center text-center">
              <h3 className="text-xl font-semibold text-blue-700 mb-4">Or Find Me Here</h3>
              <p className="text-gray-700 mb-2">
                <span className="font-medium">Email:</span> <a href={`mailto:${personalInfo.email}`} className="text-blue-600 hover:underline">{personalInfo.email}</a>
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-medium">Phone:</span> {personalInfo.phone}
              </p>
              <p className="text-gray-700 mb-6">
                <span className="font-medium">Location:</span> {personalInfo.location}
              </p>
              {/* Resume Download Button */}
              <a
                href={personalInfo.resume}
                download={personalInfo.resumeName}
                className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-full text-sm font-semibold shadow-md transition duration-300 mb-4 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Resume
              </a>
              <div className="flex space-x-6">
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900 transition duration-300">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900 transition duration-300">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 0C5.372 0 0 5.372 0 12c0 5.303 3.438 9.8 8.207 11.387.6.11.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.043-1.609-4.043-1.609-.546-1.387-1.333-1.755-1.333-1.755-1.09-.745.08-.73.08-.73 1.205.085 1.838 1.238 1.838 1.238 1.07 1.833 2.81 1.304 3.492.997.108-.775.42-1.304.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.12-.3-.535-1.52.117-3.176 0 0 1-.32 3.3-.993 1.03-.283 2.12-.425 3.22-.425 1.1 0 2.19.142 3.22.425 2.298.673 3.3 1 3.3 1 .653 1.656.238 2.876.118 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.805 5.62-5.475 5.92.43.37.81 1.104.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .318.22.69.825.577C20.565 21.8 24 17.303 24 12c0-6.628-5.372-12-12-12z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 text-center rounded-t-3xl">
        <p>&copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
