export function createMemberCard(member) {
  const card = document.createElement("div");
  card.className = "memberCard";

  card.innerHTML = `
        

        <h3>${member.name}</h3>

        <p>${member.favoriteSong}</p>

        <a href="${member.instagram.url}" target="_blank">
            ${member.instagram.username}
        </a>
    `;

  return card;
}
