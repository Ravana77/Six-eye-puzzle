import React from "react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-dark text-white p-6">
      <div className="max-w-3xl bg-secondary shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-4">About Us</h1>
        <p className="mb-4">
          Welcome to **[Your Project Name]**, a platform designed to challenge and enhance your problem-solving skills through an interactive six-equation game.
        </p>
        <p className="mb-4">
          Our project was developed as part of **[Your University Name]**'s initiative to push the boundaries of educational gaming. Using **React** and **Firebase**, we have built an intuitive and engaging experience for users who love logical challenges.
        </p>
        <p className="mb-4">
          The game is powered by the **Banana API**, developed by **[Your University/Department Name]**, ensuring a dynamic and exciting gameplay experience. We strive to bring fun and learning together in an innovative way.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">Meet the Team</h2>
        <ul>
          <li>👩‍💻 **[Your Name]** – Lead Developer</li>
          <li>🧑‍🎨 **[Another Fake Name]** – UI/UX Designer</li>
          <li>📊 **[Yet Another Fake Name]** – Project Manager</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
