
const tabs = document.querySelectorAll(".billboard__categories-tab");

tabs.forEach(el => {
	el.addEventListener('click', (event) => fetchPosts(event))
})

function fetchPosts(event) {

	document.querySelectorAll('.billboard__categories-tab').forEach( el => {
		el.classList.remove('active');
	})

	event.target.classList.add('active');

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

	posts.map( (post, index) => {
		const htmlString = `<div class="billboard__post-image">
								<img src="${post.image}" />
							</div>
							<div class="billboard__post-text">
								${ index === 0 ? `<h4><span>${post.category}</span></h4>` : '' }
								<p>${post.heading}</p>
								<p>${post.publish}</p>
								<p>${post.author}</p>
							</div>`;
		var htmlObject = document.createElement('div');
		htmlObject.classList.add('billboard__post');
		htmlObject.innerHTML=htmlString;
		document.querySelector(".billboard__posts").insertAdjacentElement('beforeend', htmlObject);
	})
}
