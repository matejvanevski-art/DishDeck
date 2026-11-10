import { Link } from 'react-router-dom';

function AboutPage() {
  return (
    <section className="container page-section about-page">
      <p className="eyebrow">ABOUT THE PROJECT</p>
      <h1>Good food brings people together.</h1>
      <p className="about-lead">
        DishDeck is a recipe discovery app built to make finding your next meal
        simple. Search by name, explore food categories, read ingredients and
        instructions, and save recipes you want to make again.
      </p>

      <div className="about-cards">
        <article>
          <span>01</span>
          <h2>Discover</h2>
          <p>Search a public recipe database and find ideas from different cuisines.</p>
        </article>
        <article>
          <span>02</span>
          <h2>Learn</h2>
          <p>Open a recipe to see its ingredients, measurements, and instructions.</p>
        </article>
        <article>
          <span>03</span>
          <h2>Remember</h2>
          <p>Save favourites and keep them between visits with localStorage.</p>
        </article>
      </div>

      <p className="about-credit">
        Recipe data is provided by <a href="https://www.themealdb.com/" target="_blank" rel="noreferrer">TheMealDB</a>.
      </p>
      <Link className="button-link" to="/recipes">Explore recipes</Link>
    </section>
  );
}

export default AboutPage;
