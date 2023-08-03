const seatsContainer = document.getElementById('seats');
const seatTypesContainer = document.getElementById('seat-types');
const selectedSeatsList = document.getElementById('selected-seats-list');
const totalPrice = document.getElementById('price');

const seatTypes = [
  { type: 'Economy', description: 'Standard seating with reasonable comfort.', price: 300 },
  { type: 'Business', description: 'Premium seating with extra legroom and amenities.', price: 600 },
  { type: 'VIP', description: 'Luxury seating with spacious cabins and personalized service.', price: 1000 },

];

let selectedSeats = [];
let total = 0;


function createSeats() {
  for (let i = 1; i <= 30; i++) {
    const seat = document.createElement('div');
    seat.classList.add('seat', 'available');
    seat.textContent = i;
    seat.addEventListener('click', () => toggleSeat(seat, i));
    seat.addEventListener('mouseover', () => showSeatDescription(seat, i));
    seat.addEventListener('mouseout', () => hideSeatDescription(seat));
    seatsContainer.appendChild(seat);
  }
}


function toggleSeat(seat, seatNumber) {
  if (seat.classList.contains('selected')) {
    seat.classList.remove('selected');
    selectedSeats = selectedSeats.filter((num) => num !== seatNumber);
    updateSelectedSeatsList();
  } else {
    seat.classList.add('selected');
    selectedSeats.push(seatNumber);
    updateSelectedSeatsList();
  }
}

function showSeatDescription(seat, seatNumber) {
  const seatType = seatTypes[seatNumber % seatTypes.length];
  const description = `Seat Type: ${seatType.type}\nDescription: ${seatType.description}\nPrice: ₹${seatType.price}`;
  const seatDescriptionElement = document.createElement('div');
  seatDescriptionElement.classList.add('seat-description');
  seatDescriptionElement.textContent = description;
  seat.appendChild(seatDescriptionElement);
}


function hideSeatDescription(seat) {
  const seatDescriptionElement = seat.querySelector('.seat-description');
  if (seatDescriptionElement) {
    seat.removeChild(seatDescriptionElement);
  }
}


function updateSelectedSeatsList() {
  selectedSeatsList.innerHTML = '';
  total = 0;
  selectedSeats.forEach((seatNumber) => {
    const seatType = seatTypes[seatNumber % seatTypes.length];
    const seatListItem = document.createElement('li');
    seatListItem.textContent = `Seat ${seatNumber} (${seatType.type}): ₹${seatType.price}`;
    selectedSeatsList.appendChild(seatListItem);
    total += seatType.price;
  });
  totalPrice.textContent = `₹${total}`;
}

createSeats();
createSeatTypes();

function createSeatTypes() {
  seatTypes.forEach((seatType) => {
    const seatTypeDiv = document.createElement('div');
    seatTypeDiv.classList.add('seat-type');
    seatTypeDiv.innerHTML = `
      <h4>${seatType.type}</h4>
      <p>${seatType.description}</p>
      <p>Price: ₹${seatType.price}</p>
    `;
    seatTypesContainer.appendChild(seatTypeDiv);
  });
}
