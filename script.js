const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');

function setMenuOpen(isOpen) {
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Zamknij menu' : 'Otwórz menu');
  navigation.classList.toggle('is-open', isOpen);
  document.body.classList.toggle('menu-open', isOpen);
}

menuButton.addEventListener('click', () => {
  setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true');
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMenuOpen(false));
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenuOpen(false);
});

document.querySelectorAll('.filter-button').forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    document.querySelectorAll('.filter-button').forEach((item) => {
      const isActive = item === button;
      item.classList.toggle('is-active', isActive);
      item.setAttribute('aria-pressed', String(isActive));
    });
    document.querySelectorAll('.adventure-card').forEach((card) => {
      card.classList.toggle('is-hidden', filter !== 'all' && card.dataset.season !== filter);
    });
  });
});

const tripDialog = document.querySelector('#trip-dialog');
const tripDetails = {
  winter: {
    season: 'ZIMA · WŁOCHY',
    kicker: 'Narciarsko-snowboardowa przygoda',
    title: 'Zima na stoku',
    summary: 'Aktywny wyjazd w górskiej scenerii dla młodych miłośników nart i snowboardu. Uczestnikom towarzyszy kadra pedagogiczno-instruktorska.',
    highlights: ['Doskonalenie jazdy na nartach lub snowboardzie', 'Wspólne dni na alpejskich stokach', 'Integracyjne wieczory, konkursy i zajęcia grupowe'],
  },
  camp: {
    season: 'LATO · MAZURY',
    kicker: 'Letni obóz stacjonarny',
    title: 'Mazury pełne przygód',
    summary: 'Wakacyjny obóz łączy aktywność nad wodą, zajęcia sportowe i kreatywny program. To propozycja dla tych, którzy lubią próbować nowych rzeczy i działać w grupie.',
    highlights: ['Zajęcia żeglarskie i aktywności wodne', 'Gry terenowe, sport i wspólne ogniska', 'Warsztaty kreatywne, plastyczne i taneczne', 'Wycieczki programowe — szczegóły zależą od turnusu'],
  },
  sail: {
    season: 'LATO · WIELKIE JEZIORA MAZURSKIE',
    kicker: 'Rejs żeglarski',
    title: 'Wspólny kurs na Mazury',
    summary: 'Kilka dni na jachcie to nauka żeglarstwa w praktyce, współpraca załogi i odkrywanie mazurskich jezior pod opieką kadry instruktorskiej.',
    highlights: ['Podstawy żeglarstwa i prace na pokładzie', 'Bezpieczeństwo na wodzie i współpraca w załodze', 'Postoje w portach i wspólne wieczory', 'Trasa, jachty i długość rejsu ustalane dla aktualnej oferty'],
  },
};

let lastTripTrigger;
const dialogSeason = document.querySelector('#dialog-season');
const dialogKicker = document.querySelector('#dialog-kicker');
const dialogTitle = document.querySelector('#dialog-title');
const dialogSummary = document.querySelector('#dialog-summary');
const dialogHighlights = document.querySelector('#dialog-highlights');

document.querySelectorAll('[data-trip]').forEach((button) => {
  button.addEventListener('click', () => {
    const details = tripDetails[button.dataset.trip];
    if (!details) return;

    lastTripTrigger = button;
    dialogSeason.textContent = details.season;
    dialogKicker.textContent = details.kicker;
    dialogTitle.textContent = details.title;
    dialogSummary.textContent = details.summary;
    dialogHighlights.replaceChildren(...details.highlights.map((highlight) => {
      const item = document.createElement('li');
      item.textContent = highlight;
      return item;
    }));
    tripDialog.showModal();
  });
});

document.querySelector('.dialog-close').addEventListener('click', () => tripDialog.close());
tripDialog.addEventListener('click', (event) => {
  if (event.target === tripDialog) tripDialog.close();
});
tripDialog.addEventListener('close', () => lastTripTrigger?.focus());

document.querySelector('#year').textContent = new Date().getFullYear();