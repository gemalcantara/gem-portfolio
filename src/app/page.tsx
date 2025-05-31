"use client";

import React, { useState } from 'react';

// Main App component for the portfolio
function App() {
  // State to manage which project case study is currently open
  const [openProject, setOpenProject] = useState(null);

  // Your personal details, skills, and project data
  const personalInfo = {
    name: "GEMUEL JOY V. ALCANTARA",
    title: "Full-Stack Web Developer",
    tagline: "Leveraging cutting-edge technologies to transform complex ideas into robust and intuitive web applications.",
    intro: "With a strong background in both front-end and back-end development, I specialize in crafting high-performance web systems and optimizing existing solutions for enhanced efficiency and security. My expertise spans e-commerce, content management, and AI-powered applications.",
    email: "gem.alcantara.ga@gmail.com",
    phone: "+639212434890",
    location: "Novaliches, Quezon City",
    linkedin: "https://www.linkedin.com/in/yourprofile", // Replace with actual LinkedIn URL
    github: "https://github.com/yourprofile", // Replace with actual GitHub URL
  };

  const skills = {
    "Languages & Frameworks": ["PHP (Laravel)", "Node.js", "Vue.js", "React.js", "JavaScript", "TypeScript", "HTML", "CSS", "Bootstrap", "SASS"],
    "Databases": ["MySQL", "MongoDB", "MS SQL", "Redis", "Firebase"],
    "Tools & Technologies": ["Docker", "Digital Ocean", "REST APIs", "Git", "Metronics"],
    "DevOps & Source Control": ["GitLab", "Git", "CI/CD"],
    "AI Integration": ["OpenAI (GPT)", "Anthropic (Claude)"],
  };

  // Generic project data based on your resume
  const projects = [
    {
      id: 'ecommerce',
      title: "E-commerce Platform: Meal Plan Delivery",
      icon: '🛒', // Placeholder icon
      technologies: ["PHP", "Laravel", "Vue.js", "MySQL", "PayMaya", "PayMongo"],
      shortDesc: "Engineered a full-featured online shopping system with integrated payment solutions and comprehensive reporting.",
      caseStudy: {
        role: "Full-Stack Developer",
        challenge: "The client required a robust, scalable platform to manage online sales, inventory, and customer interactions for a meal plan delivery service, including secure payment processing.",
        solution: "Developed a comprehensive full-stack e-commerce solution. Implemented secure payment gateway integrations (PayMaya, PayMongo) and built dynamic reporting dashboards for sales and inventory management. Designed and optimized scalable database architectures to handle high transactional volume.",
        impact: "Improved transactional efficiency, provided a scalable foundation for future growth, and streamlined inventory management for the client.",
        learnings: "Gained deeper insights into secure payment gateway integrations and optimizing database performance for high-traffic e-commerce applications."
      }
    },
    {
      id: 'cms',
      title: "Custom Content Management System (CMS)",
      icon: '📝', // Placeholder icon
      technologies: ["PHP", "Laravel", "Node.js", "React.js", "MySQL"],
      shortDesc: "Designed and developed custom CMS solutions enabling seamless content publishing and user management.",
      caseStudy: {
        role: "Full-Stack Developer",
        challenge: "Clients needed flexible, custom solutions for content publishing and user management that off-the-shelf CMS platforms couldn't provide.",
        solution: "Built bespoke CMS platforms tailored to specific client needs, allowing for easy content creation, editing, and publishing. Implemented robust user role and permission management systems, ensuring secure and efficient content workflows.",
        impact: "Empowered clients with full control over their digital content, significantly reducing reliance on manual updates and external developers.",
        learnings: "Enhanced understanding of modular architecture for CMS, focusing on extensibility and ease of use for non-technical users."
      }
    },
    {
      id: 'reservation',
      title: "Real-Time Reservation & Booking System",
      icon: '📅', // Placeholder icon
      technologies: ["PHP", "Laravel", "JavaScript", "MySQL", "Firebase"],
      shortDesc: "Built and optimized real-time booking platforms with calendar synchronization and automated notifications.",
      caseStudy: {
        role: "Full-Stack Developer",
        challenge: "The need for a real-time booking system that could handle concurrent reservations, prevent double-bookings, and provide instant notifications to users.",
        solution: "Developed an optimized booking platform with real-time calendar synchronization using Firebase for instant updates. Integrated automated notification systems (email/SMS) for booking confirmations and reminders. Focused on a user-friendly interface for seamless booking experiences.",
        impact: "Significantly improved booking efficiency and customer satisfaction through real-time updates and automated communication.",
        learnings: "Mastered real-time data synchronization techniques and complex calendar logic for high-availability booking systems."
      }
    },
    {
      id: 'chrome-extension',
      title: "Browser Productivity Extension",
      icon: '🔌', // Placeholder icon
      technologies: ["JavaScript", "APIs", "HTML", "CSS"],
      shortDesc: "Developed powerful browser extensions enhancing automation, productivity, and data extraction capabilities.",
      caseStudy: {
        role: "Full-Stack Developer",
        challenge: "Identified opportunities to automate repetitive browser tasks and enhance user productivity through custom browser extensions.",
        solution: "Designed and developed various Google Chrome Extensions that integrated with web APIs to automate data extraction, streamline workflows, and provide quick access to information, significantly boosting user efficiency.",
        impact: "Provided users with powerful tools that automated tedious tasks, leading to measurable improvements in daily productivity and data handling.",
        learnings: "Deepened understanding of browser API interactions, content scripts, and background processes for efficient extension development."
      }
    },
    {
      id: 'social-media',
      title: "Interactive Social Media Application",
      icon: '💬', // Placeholder icon
      technologies: ["Node.js", "React.js", "MongoDB"],
      shortDesc: "Created engagement-driven platforms integrating interactive features such as real-time messaging and notifications.",
      caseStudy: {
        role: "Full-Stack Developer",
        challenge: "The goal was to build a dynamic social media platform that fosters user engagement through interactive features and real-time communication.",
        solution: "Developed a robust social media application with real-time messaging capabilities and an instant notification system. Focused on creating a highly interactive user experience with dynamic content feeds and user profiles.",
        impact: "Successfully launched a platform that encouraged active user participation and facilitated seamless communication, enhancing community interaction.",
        learnings: "Gained extensive experience in building scalable real-time communication features and managing large datasets in a social networking context."
      }
    },
    {
      id: 'ai-chatbot',
      title: "AI-Powered Chatbot Solution",
      icon: '🤖', // Placeholder icon
      technologies: ["OpenAI (GPT)", "Anthropic (Claude)", "Node.js", "Python"],
      shortDesc: "Integrated OpenAI (GPT) and Anthropic (Claude) to develop intelligent chatbots for automated customer support and dynamic content generation.",
      caseStudy: {
        role: "Full-Stack Developer / AI Integrator",
        challenge: "Clients sought to automate customer support and generate dynamic content using advanced AI models.",
        solution: "Integrated leading AI models (OpenAI GPT, Anthropic Claude) into custom chatbot solutions. Developed sophisticated conversational flows to handle various customer inquiries and generate contextually relevant content, significantly improving response times and efficiency.",
        impact: "Revolutionized customer support operations by providing instant, intelligent responses and enabled dynamic content creation, reducing manual effort.",
        learnings: "Developed deep expertise in prompt engineering, API integration with large language models, and designing effective conversational AI experiences."
      }
    },
    {
      id: 'ride-hailing',
      title: "Ride-Hailing & Logistics Platform",
      icon: '🚗', // Placeholder icon
      technologies: ["PHP", "Laravel", "JavaScript", "MySQL", "Geolocation APIs"],
      shortDesc: "Designed and implemented ride-booking systems featuring real-time tracking, automated fare calculation, and driver-rider matching algorithms.",
      caseStudy: {
        role: "Full-Stack Developer",
        challenge: "The objective was to create a reliable and efficient ride-hailing system that could handle real-time location tracking, dynamic fare calculations, and intelligent matching.",
        solution: "Developed a comprehensive ride-booking platform, including robust backend logic for real-time GPS tracking, dynamic fare calculation based on distance and time, and sophisticated driver-rider matching algorithms. Implemented intuitive user interfaces for both riders and drivers.",
        impact: "Provided a seamless and efficient platform for on-demand transportation, improving service delivery and operational logistics.",
        learnings: "Gained hands-on experience with complex geolocation services, real-time data processing, and optimizing matching algorithms for efficiency."
      }
    },
  ];

  // Function to handle opening a project case study
  const handleOpenProject = (projectId) => {
    setOpenProject(projects.find(p => p.id === projectId));
  };

  // Function to handle closing a project case study
  const handleCloseProject = () => {
    setOpenProject(null);
  };

  // Contact form submission handler (placeholder)
  const handleContactSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to a backend service
    alert("Thank you for your message! I'll get back to you soon.");
    e.target.reset(); // Clear the form
  };

  return (
    <div className="min-h-screen bg-gray-50 font-inter text-gray-800 antialiased">
      {/* Header/Hero Section */}
      <header className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20 px-4 sm:px-6 lg:px-8 shadow-lg rounded-b-3xl">
        <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 rounded-lg p-2 inline-block bg-white/15">
              {personalInfo.name}
            </h1>
          <p className="text-xl sm:text-2xl lg:text-3xl font-light mb-6">
            {personalInfo.title}
          </p>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto mb-8 leading-relaxed">
            {personalInfo.tagline}
          </p>
          <button
            onClick={() => {
              // Smooth scroll to projects section
              document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-white text-blue-700 hover:bg-blue-100 px-8 py-3 rounded-full text-lg font-semibold shadow-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            View My Projects
          </button>
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
          <div className="fixed inset-0 bg-black/75 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto relative">
              <button
                onClick={handleCloseProject}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-3xl font-bold"
              >
                &times;
              </button>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">{openProject.title}</h3>
              <p className="text-sm text-gray-600 mb-4">
                **Role:** {openProject.caseStudy.role}
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
              <p className="text-sm text-gray-500 italic">
                *Due to client confidentiality, a live demo or direct screenshots are not available for this private project. This case study focuses on my contributions and the technologies applied.*
              </p>
            </div>
          </div>
        )}

        {/* Contact Section */}
        <section className="bg-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 text-center">Let's Connect</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8 text-center max-w-3xl mx-auto">
            I'm always open to new opportunities and collaborations. Feel free to reach out!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-gray-100 p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-blue-700 mb-4">Send Me a Message</h3>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    required
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white py-2 rounded-full font-semibold hover:bg-purple-700 transition duration-300 shadow-md"
                >
                  Send Message
                </button>
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
