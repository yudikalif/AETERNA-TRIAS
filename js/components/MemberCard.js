export function createMemberCard(member) {
  const card = document.createElement("div");
  card.className = "memberCard";

  card.innerHTML = `
    <div class="memberBackground"></div>

    <div class="memberOverlay"></div>

    <div class="memberContent">
     

      <h3>${member.name}</h3>

      <p>🎵 ${member.favoriteSong}</p>

      <a href="${member.instagram.url}" target="_blank">
        ${member.instagram.username}
      </a>
    </div>
  `;

  // Background photo
  if (member.image) {
    card.querySelector(".memberBackground").style.backgroundImage =
      `url("${member.image}")`;
  }

  return card;
}
