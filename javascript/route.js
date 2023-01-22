/* Make URL Routing */
const urlRoutes = {
    404: {
        template: "/templates/404.html",
        title: "",
        description: ""
    },
    "/": {
        template: "/templates/menu.html",
        title: "",
        description: ""
    },
    "/game": {
        template: "/templates/game.html",
        title: "",
        description: ""
    },
}

export const urlRoute = (route) => {
    window.history.pushState({}, '', route);
    urlLocationHandler();
}

const urlLocationHandler = async () => {
    let location = window.location.pathname;

    if ( location.length === 0 )
        location = "/";

        
        const route = urlRoutes[location] || urlRoutes[404];

    // Fetch Html Content
    const html = await fetch(route.template)
    .then(res => res.text())
    .catch(err => console.log(err))
    
    document.getElementById('content').innerHTML = html;
}

window.onpopstate = urlLocationHandler;
window.route = urlRoute;

urlLocationHandler();