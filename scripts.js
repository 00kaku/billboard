
const tabs = document.querySelectorAll(".billboard__categories-tab");

tabs.forEach(el => {
	el.addEventListener('click', (event) => fetchPosts(event))
})

function fetchPosts(event) {
	fetch("./data.json")
		.then(response => response.json())
		.then(json => {
			posts = [];
			json.find(el => { if (el.category === event.target.innerHTML) { posts.push(el); } });
			return updatePosts(posts);
		}
		)
		.catch(err => console.log(err));
}

function updatePosts(posts) {
	const container = document.querySelector(".billboard__posts");
	while (container.firstChild) {
	  container.removeChild(container.lastChild);
	}

	posts.map(post => {
		const htmlString = `<div class="billboard__post">
						<div class="billboard__post-image">
							<img src="${post.image}" />
						</div>
						<div class="billboard__post-text">
							<h2>${post.heading}</h2>
							<h5>${post.publish}</h5>
							<h5>${post.author}</h5>
						</div>
					</div>`;
		var htmlObject = document.createElement('div');
		htmlObject.innerHTML=htmlString;
		document.querySelector(".billboard__posts").insertAdjacentElement('beforeend', htmlObject);
	})
}
