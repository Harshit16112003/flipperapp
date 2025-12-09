import React, { useState, useEffect } from 'react';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default function App() {
  const [projectsData, setProjectsData] = useState([]);
  const [clientsData, setClientsData] = useState([]);
  const [contactsData, setContactsData] = useState([]);
  const [newsletterData, setNewsletterData] = useState([]);
  const [adminPanelOpen, setAdminPanelOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('projects');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch data from backend
  useEffect(() => {
    fetchProjects();
    fetchClients();
    fetchContacts();
    fetchNewsletter();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${API_URL}/api/projects`);
      const data = await response.json();
      setProjectsData(data);
    } catch (err) {
      console.error('Error fetching projects:', err);
    }
  };

  const fetchClients = async () => {
    try {
      const response = await fetch(`${API_URL}/api/clients`);
      const data = await response.json();
      setClientsData(data);
    } catch (err) {
      console.error('Error fetching clients:', err);
    }
  };

  const fetchContacts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/contacts`);
      const data = await response.json();
      setContactsData(data);
    } catch (err) {
      console.error('Error fetching contacts:', err);
    }
  };

  const fetchNewsletter = async () => {
    try {
      const response = await fetch(`${API_URL}/api/newsletters`);
      const data = await response.json();
      setNewsletterData(data);
    } catch (err) {
      console.error('Error fetching newsletter:', err);
    }
  };

  const showMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const addProject = async (event) => {
    event.preventDefault();
    const form = event.target;
    const projectData = {
      name: form.projectName.value,
      description: form.projectDesc.value,
      image: form.projectImage.value
    };

    try {
      const response = await fetch(`${API_URL}/api/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData)
      });
      if (response.ok) {
        fetchProjects();
        form.reset();
        showMessage('Project added successfully!');
      }
    } catch (err) {
      console.error('Error adding project:', err);
      showMessage('Error adding project');
    }
  };

  const addClient = async (event) => {
    event.preventDefault();
    const form = event.target;
    const clientData = {
      name: form.clientName.value,
      description: form.clientDesc.value,
      image: form.clientImage.value,
      designation: form.clientDesignation.value
    };

    try {
      const response = await fetch(`${API_URL}/api/clients`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clientData)
      });
      if (response.ok) {
        fetchClients();
        form.reset();
        showMessage('Client added successfully!');
      }
    } catch (err) {
      console.error('Error adding client:', err);
      showMessage('Error adding client');
    }
  };

  const submitContact = async (event) => {
    event.preventDefault();
    const form = event.target;
    const contactData = {
      name: form.contactName.value,
      email: form.contactEmail.value,
      phone: form.contactPhone.value,
      city: form.contactCity.value
    };

    try {
      const response = await fetch(`${API_URL}/api/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactData)
      });
      if (response.ok) {
        fetchContacts();
        form.reset();
        showMessage('Thank you! Your message has been received.');
      }
    } catch (err) {
      console.error('Error submitting contact:', err);
      showMessage('Error submitting form');
    }
  };

  const submitNewsletter = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.newsletterEmail.value;

    try {
      const response = await fetch(`${API_URL}/api/newsletters`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if (response.ok) {
        fetchNewsletter();
        form.reset();
        showMessage('Successfully subscribed to our newsletter!');
      } else {
        showMessage('Email already subscribed');
      }
    } catch (err) {
      console.error('Error subscribing:', err);
      showMessage('Error subscribing to newsletter');
    }
  };

  return (
    <div className="App">
      {/* Navigation */}
      <nav className="navbar">
        <div className="container">
          <div className="logo">
            <span className="logo-icon">Flipper</span>
          </div>
          <button className="admin-btn" onClick={() => setAdminPanelOpen(true)}>Admin Panel</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <h1>Welcome to Flipper</h1>
          <p>Creative Solutions for Modern Businesses</p>
          <button className="cta-button">Get Started</button>
        </div>
      </section>

      {/* Our Projects Section */}
      <section className="projects-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Projects</h2>
            <p className="section-subtitle">Showcase of our latest and greatest work</p>
          </div>
          <div className="projects-grid">
            {projectsData.length > 0 ? (
              projectsData.map(project => (
                <div key={project._id} className="project-card">
                  <div className="project-image-wrapper">
                    <img src={project.image} alt={project.name} className="project-image" />
                  </div>
                  <div className="project-content">
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    <button className="read-more-btn">Read More</button>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-data">No projects available yet.</p>
            )}
          </div>
        </div>
      </section>

      {/* Happy Clients Section */}
      <section className="clients-section">
        <div className="container">
          <div className="section-header">
            <h2>Happy Clients</h2>
            <p className="section-subtitle">Trusted by leading companies worldwide</p>
          </div>
          <div className="clients-grid">
            {clientsData.length > 0 ? (
              clientsData.map(client => (
                <div key={client._id} className="client-card">
                  <div className="client-image-wrapper">
                    <img src={client.image} alt={client.name} className="client-image" />
                  </div>
                  <h3>{client.name}</h3>
                  <div className="client-designation">{client.designation}</div>
                  <p>{client.description}</p>
                </div>
              ))
            ) : (
              <p className="no-data">No clients available yet.</p>
            )}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-section">
        <div className="container">
          <div className="section-header light">
            <h2>Get In Touch</h2>
            <p className="section-subtitle">We'd love to hear from you. Send us a message!</p>
          </div>
          <form className="contact-form" onSubmit={submitContact}>
            <div className="form-grid">
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" name="contactName" placeholder="Your name" required />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" name="contactEmail" placeholder="your@email.com" required />
              </div>
              <div className="form-group">
                <label>Mobile Number</label>
                <input type="tel" name="contactPhone" placeholder="+1 (555) 000-0000" required />
              </div>
              <div className="form-group">
                <label>City</label>
                <input type="text" name="contactCity" placeholder="Your city" required />
              </div>
            </div>
            <button type="submit" className="submit-btn">Submit</button>
          </form>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <h2>Subscribe to Our Newsletter</h2>
            <p>Get the latest updates, news, and exclusive offers delivered to your inbox</p>
            <form className="newsletter-form" onSubmit={submitNewsletter}>
              <input 
                type="email" 
                name="newsletterEmail" 
                placeholder="Enter your email address" 
                required 
              />
              <button type="submit" className="newsletter-btn">Subscribe</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>About Flipper</h4>
              <p>We create innovative digital solutions that help businesses grow and succeed in the modern world.</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#projects">Our Projects</a></li>
                <li><a href="#clients">Happy Clients</a></li>
                <li><a href="#contact">Contact Us</a></li>
                <li><a href="#newsletter">Newsletter</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Contact Info</h4>
              <p>Email: info@flipper.com</p>
              <p>Phone: +1 (555) 123-4567</p>
              <p>Address: 123 Tech Street, San Francisco, CA</p>
            </div>
            <div className="footer-section">
              <h4>Follow Us</h4>
              <div className="social-links">
                <a href="#facebook" className="social-link">Facebook</a>
                <a href="#twitter" className="social-link">Twitter</a>
                <a href="#linkedin" className="social-link">LinkedIn</a>
                <a href="#instagram" className="social-link">Instagram</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Flipper. All rights reserved.</p>
            <p>Designed & Developed with ❤️ by Harshit Bhorgade</p>
          </div>
        </div>
      </footer>

      {/* Admin Panel */}
      {adminPanelOpen && (
        <div className="admin-panel active">
          <div className="admin-container">
            <div className="admin-header">
              <h1>Admin Panel</h1>
              <button className="close-admin" onClick={() => setAdminPanelOpen(false)}>✕ Close</button>
            </div>

            {successMessage && <div className="success-message show">{successMessage}</div>}

            {/* Admin Tabs */}
            <div className="admin-tabs">
              <button 
                className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`} 
                onClick={() => setActiveTab('projects')}
              >
                📁 Projects
              </button>
              <button 
                className={`tab-btn ${activeTab === 'clients' ? 'active' : ''}`} 
                onClick={() => setActiveTab('clients')}
              >
                👥 Clients
              </button>
              <button 
                className={`tab-btn ${activeTab === 'contacts' ? 'active' : ''}`} 
                onClick={() => setActiveTab('contacts')}
              >
                📧 Contacts
              </button>
              <button 
                className={`tab-btn ${activeTab === 'newsletter' ? 'active' : ''}`} 
                onClick={() => setActiveTab('newsletter')}
              >
                📰 Newsletter
              </button>
            </div>

            {/* Projects Tab */}
            {activeTab === 'projects' && (
              <div className="admin-content active">
                <div className="admin-form">
                  <h3>➕ Add New Project</h3>
                  <form onSubmit={addProject}>
                    <div className="form-group">
                      <label>Project Image URL</label>
                      <input type="url" name="projectImage" placeholder="https://example.com/image.jpg" required />
                    </div>
                    <div className="form-group">
                      <label>Project Name</label>
                      <input type="text" name="projectName" placeholder="Enter project name" required />
                    </div>
                    <div className="form-group">
                      <label>Project Description</label>
                      <textarea name="projectDesc" placeholder="Enter project description" required></textarea>
                    </div>
                    <button type="submit" className="form-submit-btn">Add Project</button>
                  </form>
                </div>
                <h3>All Projects ({projectsData.length})</h3>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projectsData.map(project => (
                      <tr key={project._id}>
                        <td><img src={project.image} alt={project.name} className="table-img" /></td>
                        <td>{project.name}</td>
                        <td>{project.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Clients Tab */}
            {activeTab === 'clients' && (
              <div className="admin-content active">
                <div className="admin-form">
                  <h3>➕ Add New Client</h3>
                  <form onSubmit={addClient}>
                    <div className="form-group">
                      <label>Client Image URL</label>
                      <input type="url" name="clientImage" placeholder="https://example.com/image.jpg" required />
                    </div>
                    <div className="form-group">
                      <label>Client Name</label>
                      <input type="text" name="clientName" placeholder="Enter client name" required />
                    </div>
                    <div className="form-group">
                      <label>Client Description</label>
                      <textarea name="clientDesc" placeholder="Enter client description" required></textarea>
                    </div>
                    <div className="form-group">
                      <label>Designation</label>
                      <select name="clientDesignation" required>
                        <option value="">Select Designation</option>
                        <option value="CEO">CEO</option>
                        <option value="Web Developer">Web Developer</option>
                        <option value="Designer">Designer</option>
                        <option value="Manager">Manager</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <button type="submit" className="form-submit-btn">Add Client</button>
                  </form>
                </div>
                <h3>All Clients ({clientsData.length})</h3>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Designation</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientsData.map(client => (
                      <tr key={client._id}>
                        <td><img src={client.image} alt={client.name} className="table-img-circle" /></td>
                        <td>{client.name}</td>
                        <td>{client.designation}</td>
                        <td>{client.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Contacts Tab */}
            {activeTab === 'contacts' && (
              <div className="admin-content active">
                <h3>Contact Form Submissions ({contactsData.length})</h3>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Full Name</th>
                      <th>Email</th>
                      <th>Mobile</th>
                      <th>City</th>
                      <th>Submitted Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contactsData.map(contact => (
                      <tr key={contact._id}>
                        <td>{contact.name}</td>
                        <td>{contact.email}</td>
                        <td>{contact.phone}</td>
                        <td>{contact.city}</td>
                        <td>{new Date(contact.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Newsletter Tab */}
            {activeTab === 'newsletter' && (
              <div className="admin-content active">
                <h3>Newsletter Subscriptions ({newsletterData.length})</h3>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Email Address</th>
                      <th>Subscribed Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {newsletterData.map(sub => (
                      <tr key={sub._id}>
                        <td>{sub.email}</td>
                        <td>{new Date(sub.subscribedAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}