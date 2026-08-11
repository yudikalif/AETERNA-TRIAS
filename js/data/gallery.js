const totalImages = 12;

const gallery = [];

for (let i = 1; i <= totalImages; i++) {
  gallery.push({
    id: i,
    image: `./assets/images/id (${i}).jpeg`,
  });
}

console.log(gallery);

export default gallery;
