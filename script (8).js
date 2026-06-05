// Sample Data
let selectedDate = "2026-06-10";
let selectedTime = null;

const upcomingMeetings = [
    { title: "Product Demo with Sarah", time: "June 10, 2026 • 10:00 AM", status: "Confirmed" },
    { title: "Strategy Call - Marketing", time: "June 12, 2026 • 2:30 PM", status: "Confirmed" }
];

const pastMeetings = [
    { title: "Onboarding with Mike", time: "June 2, 2026 • 11:00 AM" },
    { title: "Follow-up with Design Team", time: "May 28, 2026 • 9:00 AM" }
];

// Render Calendar Days (Simple June 2026)
function renderCalendar() {
    const container = document.getElementById('calendar-days');
    container.innerHTML = `
        <div class="text-red-500 text-sm font-medium">Sun</div>
        <div class="text-sm font-medium">Mon</div>
        <div class="text-sm font-medium">Tue</div>
        <div class="text-sm font-medium">Wed</div>
        <div class="text-sm font-medium">Thu</div>
        <div class="text-sm font-medium">Fri</div>
        <div class="text-sm font-medium">Sat</div>
    `;

    for (let i = 1; i <= 30; i++) {
        const day = document.createElement('div');
        day.className = `day text-center ${i === 10 ? 'selected' : ''}`;
        day.textContent = i;
        day.onclick = () => selectDate(i);
        container.appendChild(day);
    }
}

// Time Slots
const availableTimes = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "01:00 PM", "01:30 PM",
    "02:00 PM", "02:30 PM", "03:00 PM"
];

function renderTimeSlots() {
    const container = document.getElementById('time-slots');
    container.innerHTML = '';
    
    availableTimes.forEach(time => {
        const slot = document.createElement('div');
        slot.className = `time-slot ${selectedTime === time ? 'selected' : ''}`;
        slot.textContent = time;
        slot.onclick = () => {
            selectedTime = time;
            renderTimeSlots();
        };
        container.appendChild(slot);
    });
}

function selectDate(day) {
    selectedDate = `2026-06-${day.toString().padStart(2, '0')}`;
    document.querySelectorAll('.day').forEach(d => d.classList.remove('selected'));
    event.target.classList.add('selected');
}

// Show Sections
function showSection(section) {
    document.querySelectorAll('.section').forEach(sec => sec.classList.add('hidden'));
    document.getElementById(section + '-section').classList.remove('hidden');
    
    if (section === 'booking') {
        renderCalendar();
        renderTimeSlots();
    }
    if (section === 'dashboard') {
        renderDashboard();
    }
}

// Render Dashboard
function renderDashboard() {
    // Upcoming
    const upcomingContainer = document.getElementById('upcoming-list');
    upcomingContainer.innerHTML = upcomingMeetings.map(m => `
        <div class="bg-white p-5 rounded-2xl shadow border border-green-100">
            <p class="font-semibold">${m.title}</p>
            <p class="text-sm text-gray-500 mt-1">${m.time}</p>
            <span class="inline-block mt-3 px-4 py-1 bg-green-100 text-green-700 text-xs rounded-full">${m.status}</span>
        </div>
    `).join('');

    // Past
    const pastContainer = document.getElementById('past-list');
    pastContainer.innerHTML = pastMeetings.map(m => `
        <div class="bg-white p-5 rounded-2xl shadow">
            <p class="font-semibold">${m.title}</p>
            <p class="text-sm text-gray-500 mt-1">${m.time}</p>
        </div>
    `).join('');
}

// Book Meeting
function bookMeeting() {
    if (!selectedTime) {
        alert("Please select a time slot!");
        return;
    }
    
    const details = `30 Minute Meeting<br><strong>${selectedDate}</strong> at <strong>${selectedTime}</strong>`;
    document.getElementById('modal-event-details').innerHTML = details;
    document.getElementById('confirmation-modal').classList.remove('hidden');
    document.getElementById('confirmation-modal').classList.add('flex');
}

function closeConfirmation() {
    document.getElementById('confirmation-modal').classList.add('hidden');
    document.getElementById('confirmation-modal').classList.remove('flex');
    alert("✅ Meeting booked successfully! A confirmation email has been sent.");
}

// Fake Login
function showLoginModal() {
    document.getElementById('login-modal').classList.remove('hidden');
    document.getElementById('login-modal').classList.add('flex');
}

function closeLoginModal() {
    document.getElementById('login-modal').classList.add('hidden');
    document.getElementById('login-modal').classList.remove('flex');
}

function fakeLogin() {
    alert("✅ Logged in successfully! (Demo Mode)");
    closeLoginModal();
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    showSection('home');
});