import React from 'react';
import './AboutUs.css'; // Make sure to create an AboutUs.css file for styling

const AboutUs = () => {
  return (
    <div className="about-us">
      <h1>About Us</h1>
      <p>
        Welcome to ShopPlus, your number one source for all things [product, ie: electronics, book, clothing]. 
        We're dedicated to giving you the very best of [product], with a focus on [three characteristics, ie: dependability, customer service and uniqueness.]
      </p>
      <p>
        Founded in [year] by [founder's name], ShopPlus has come a long way from its beginnings in [starting location]. 
        When [founder's name] first started out, [his/her/their] passion for [brand message - ie: "eco-friendly cleaning products"] 
        drove them to [action: quit day job, do tons of research, etc.] so that ShopPlus can offer you [competitive differentiator - 
        ie: "the world's most advanced toothbrush"]. We now serve customers all over [place - ie: the United States], and are thrilled 
        that we're able to turn our passion into [our/your] own website.
      </p>
      <p>
        We hope you enjoy our products as much as we enjoy offering them to you. If you have any questions or comments, 
        please don't hesitate to contact us.
      </p>
      <p>
        Sincerely,
      </p>
      <p>
        [Founder's Name], CEO of ShopPlus
      </p>
    </div>
  );
};

export default AboutUs;
