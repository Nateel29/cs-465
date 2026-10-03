var fs = require('fs');
var path = require('path');

// Model: load trip data from JSON
var trips = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'data', 'trips.json'), 'utf8')
);

// Shared navigation used by the header/footer partials
function navigation(activeHref) {
  return [
    { label: 'Home', href: '/', active: activeHref === '/' },
    { label: 'Travel', href: '/travel', active: activeHref === '/travel' },
    { label: 'Rooms', href: '/rooms.html', active: activeHref === '/rooms.html' },
    { label: 'Meals', href: '/meals.html', active: activeHref === '/meals.html' },
    { label: 'News', href: '/news.html', active: activeHref === '/news.html' },
    { label: 'About', href: '/about.html', active: activeHref === '/about.html' },
    { label: 'Contact', href: '/contact.html', active: activeHref === '/contact.html' }
  ];
}

var traveler = {
  /* GET home page */
  home: function(req, res) {
    res.render('traveler', {
      title: 'Travlr Getaways',
      navigation: navigation('/'),
      posts: [
        {
          title: '2023 Best Beaches Contest Winners',
          date: 'April 02, 2023',
          summary: 'Integer magna leo, posuere et dignissim vitae, porttitor at odio. Pellentesque a metus nec magna placerat volutpat.'
        },
        {
          title: 'Top 10 Diving Spots',
          date: 'May 29, 2023',
          summary: 'Maecenas scelerisque odio quis arcu fringilla malesuada. Nulla facilisi. In libero nulla, fermentum ut pretium ac.'
        }
      ]
    });
  },

  /* GET travel page */
  travel: function(req, res) {
    res.render('travel', {
      title: 'Travel | Travlr Getaways',
      navigation: navigation('/travel'),
      trips: trips
    });
  }
};

module.exports = traveler;