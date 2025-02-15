import React from 'react';
import '../styles/About.css';

const About = () => {
  return (
    <div className="about-us-container">
      <header className="about-us-header">
        <h1>About Us</h1>
      </header>

      <section className="about-us-content">
        <h2>Who We Are</h2>
        <p>
          At <strong>EndangeraProtect</strong>, we are passionate about safeguarding the world's most vulnerable species.
          Our mission is to combat the global decline in biodiversity by combining cutting-edge technology, ecological
          expertise, and innovative solutions.
        </p>
        <p>
          We are a team of conservationists, technologists, and data enthusiasts committed to making a difference. Our
          platform uses advanced data analytics and artificial intelligence to monitor species populations, identify
          extinction risks, and provide actionable insights to authorities and organizations worldwide.
        </p>

        <h2>Our Mission</h2>
        <p>
          To protect endangered species by leveraging technology to monitor, analyze, and act on data, ensuring a
          sustainable future for biodiversity.
        </p>
        <p>
          We aim to create a proactive solution that empowers decision-makers with real-time information, helping them
          implement timely measures to prevent extinction.
        </p>

        <h2>What We Do</h2>
        <ul>
          <li><strong>Population Monitoring:</strong> We track the populations of endangered species using live data and predictive analytics.</li>
          <li><strong>Cause Analysis:</strong> By identifying the root causes of population decline, we help stakeholders address critical threats like habitat loss, poaching, and climate change.</li>
          <li><strong>Actionable Alerts:</strong> Our system notifies authorities and organizations in real-time, enabling immediate response to conservation emergencies.</li>
          <li><strong>Awareness & Education:</strong> We strive to educate the public about the importance of biodiversity and inspire action to protect our planet's wildlife.</li>
        </ul>

        <h2>Our Vision</h2>
        <p>
          A world where no species goes extinct due to negligence or lack of information. By bridging the gap between
          technology and conservation, we envision a thriving planet where all life forms coexist harmoniously.
        </p>

        <h2>Why EndangeraProtect?</h2>
        <ul>
          <li><strong>Innovative Technology:</strong> We harness the power of AI and data science to develop predictive models for wildlife conservation.</li>
          <li><strong>Collaboration:</strong> We work with governments, NGOs, and researchers to ensure comprehensive and effective solutions.</li>
          <li><strong>Transparency:</strong> Our platform promotes open access to critical data, fostering accountability and collaboration.</li>
        </ul>

        <h2>Join Us</h2>
        <p>
          Together, we can make a difference. Explore our platform, contribute to conservation efforts, or simply spread
          the word. Every action counts when it comes to saving endangered species.
        </p>
      </section>

    </div>
  );
}

export default About;
