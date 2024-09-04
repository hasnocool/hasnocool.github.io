document.addEventListener('DOMContentLoaded', () => {
    let allowTilt = true;

    // Array of Monty Python-inspired jokes
    const jokes = [
        {
            headerDate: [
                "Available faster than you can say 'Ni!'",
                "Ready before King Arthur finds the Holy Grail",
                "In stores now, unlike the airspeed velocity of an unladen swallow",
                "Accessible quicker than a French Taunter can insult you",
                "On sale now, no shrubbery required"
            ],
            contentTagline: [
                "Customize your vehicles with more magic than Tim the Enchanter",
                "Equip thy tank with coconuts for that authentic galloping sound",
                "Enchant thy aircraft to withstand even the most vicious rabbit attacks",
                "Upgrade thy naval vessels to repel fish-slapping Fins",
                "Modify thy ground forces to be always looking on the bright side of life"
            ],
            menuItemLink: [
                "Begin thy customization quest<br/>Bring out your dead vehicles!",
                "Start thy vehicular transformation<br/>No Spanish Inquisition expected",
                "Embark on thy modification crusade<br/>Mind the killer rabbit",
                "Initiate thy personalization pilgrimage<br/>Beware of flying cows",
                "Launch thy customization catapult<br/>Fetchez la vache!"
            ],
            quote: [
                "Cloak thy steel beast in the finest of armors, for 'tis but a scratch!",
                "Adorn thy war machine with the mightiest of upgrades, and thou shalt taunt thy foes a second time!",
                "Equip thy chariot of destruction, lest the Black Knight deem it 'merely a flesh wound'",
                "Prepare thy battle-wagon, for we are the knights who say... 'Aaagh! War Thunder!'",
                "Fortify thy iron steed, for none shall pass... without proper customization!"
            ]
        }
    ];

    // Function to rotate jokes
    function rotateJokes() {
        const headerDate = document.querySelector('.header__date');
        const contentTagline = document.querySelector('.content__tagline');
        const menuItemLink = document.querySelector('.menu__item-link');
        const quote = document.querySelector('.quote');

        function getRandomJoke(jokeArray) {
            return jokeArray[Math.floor(Math.random() * jokeArray.length)];
        }

        headerDate.textContent = getRandomJoke(jokes[0].headerDate);
        contentTagline.textContent = getRandomJoke(jokes[0].contentTagline);
        menuItemLink.innerHTML = getRandomJoke(jokes[0].menuItemLink);
        quote.textContent = getRandomJoke(jokes[0].quote);
    }

    // Rotate jokes every 10 seconds
    setInterval(rotateJokes, 10000);

    // Initial joke rotation
    rotateJokes();

    // Class Menu.
    class Menu {
        constructor(el) {
            this.DOM = {el: el};
            this.DOM.openCtrl = document.querySelector('.action--menu');
            this.DOM.closeCtrl = document.querySelector('.action--close');
            this.DOM.openCtrl.addEventListener('click', () => this.open());
            this.DOM.closeCtrl.addEventListener('click', () => this.close());

            this.DOM.items = Array.from(this.DOM.el.querySelectorAll('.menu__item'));
            this.itemsTotal = this.DOM.items.length;

            this.DOM.mainLinks = this.DOM.el.querySelectorAll('.mainmenu > a.mainmenu__item');
            this.DOM.sidemenuLinks = this.DOM.el.querySelectorAll('.sidemenu span.sidemenu__item-inner');
            this.DOM.menulink = this.DOM.el.querySelector('.menu__item-link');

            this.addMenuItemListeners();
        }

        addMenuItemListeners() {
            this.DOM.mainLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const action = link.textContent.toLowerCase();
                    this.handleMenuAction(action);
                });
            });

            this.DOM.sidemenuLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const action = link.textContent.toLowerCase();
                    this.handleMenuAction(action);
                });
            });

            if (this.DOM.menulink) {
                this.DOM.menulink.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.handleMenuAction('menulink');
                });
            }
        }



        handleMenuAction(action) {
            console.log(`Menu action: ${action}`);
            this.hideAllSections();
            switch(action) {
                case 'features':
                    this.showSection('features');
                    break;
                case 'screenshots':
                    this.showSection('screenshots');
                    break;
                case 'download':
                    this.showSection('downloads');
                    break;
                case 'about':
                    this.showSection('about');
                    break;
                case 'one-click install':
                    showOneClickInstall();
                    break;
                case 'extensive library':
                    showExtensiveLibrary();
                    break;
                case 'auto-updates':
                    showAutoUpdates();
                    break;
                case 'user-friendly':
                    showUserFriendly();
                    break;
                case 'compatibility check':
                    showCompatibilityCheck();
                    break;
                case 'backup & restore':
                    showBackupRestore();
                    break;
                case 'menulink':
                    handleMenuLink();
                    break;
                default:
                    console.log('Unknown action');
            }
            this.close();
        }
        
        open() {
            this.toggle('open');
        }

        close() {
            this.toggle('close');
        }


        hideAllSections() {
            const sections = document.querySelectorAll('.content-section');
            sections.forEach(section => section.classList.add('hidden'));
        }

        showSection(sectionId) {
            const section = document.getElementById(sectionId);
            if (section) {
                section.classList.remove('hidden');
            }
        }


        toggle(action) {
            if (this.isAnimating) return;
            allowTilt = action === 'open' ? false : true;
            this.isAnimating = true;
            
            this.DOM.el.classList[action === 'open' ? 'add' : 'remove']('menu--open');
            
            const animationEnd = (pos) => {
                if (pos === this.itemsTotal - 1) {
                    this.isAnimating = false;
                }
            };
            
            this.DOM.items.forEach((el, pos) => {
                const innerEl = el.querySelector('.menu__item-inner');
                
                const config = {};
                const configInner = {};
                const direction = el.dataset.direction;
                
                if (direction === 'bt') {
                    config.y = '101%';
                    configInner.y = '-101%';
                    configInner.x = '0%';
                } else if (direction === 'tb') {
                    config.y = '-101%';
                    configInner.y = '101%';
                    configInner.x = '0%';
                } else if (direction === 'lr') {
                    config.x = '-101%';
                    configInner.x = '101%';
                } else if (direction === 'rl') {
                    config.x = '101%';
                    configInner.x = '-101%';
                } else {
                    config.x = '101%';
                    config.y = '101%';
                    configInner.x = '-101%';
                    configInner.y = '-101%';
                }
                
                if (action === 'open') {
                    gsap.set(el, config);
                    gsap.set(innerEl, configInner);

                    gsap.to([el,innerEl], {
                        duration: 0.9,
                        ease: "power3.inOut",
                        x: '0%',
                        y: '0%',
                        onComplete: () => animationEnd(pos)
                    });
                } else {
                    gsap.to(el, {
                        duration: 0.6,
                        ease: "power3.inOut",
                        x: config.x || 0,
                        y: config.y || 0
                    });
                    gsap.to(innerEl, {
                        duration: 0.6,
                        ease: "power3.inOut",
                        x: configInner.x || 0,
                        y: configInner.y || 0,
                        onComplete: () => animationEnd(pos)
                    });
                }
            });

            gsap.to(this.DOM.closeCtrl, {
                duration: 0.6,
                ease: action === 'open' ? "power3.inOut" : "power3.in",
                startAt: action === 'open' ? {rotation: 0} : null,
                opacity: action === 'open' ? 1 : 0,
                rotation: action === 'open' ? 180 : 270
            });
            gsap.to(this.DOM.openCtrl, {
                duration: action === 'open' ? 0.6 : 0.3,
                delay: action === 'open' ? 0 : 0.3,
                ease: action === 'open' ? "power3.inOut" : "power3.in",
                opacity: action === 'open' ? 0 : 1
            });

            gsap.to(this.DOM.mainLinks, {
                duration: action === 'open' ? 0.9 : 0.2,
                ease: action === 'open' ? "power3.inOut" : "power3.in",
                startAt: action === 'open' ? {y: '50%', opacity: 0} : null,
                y: action === 'open' ? '0%' : '50%',
                opacity: action === 'open' ? 1 : 0,
                stagger: action === 'open' ? 0.1 : -0.1
            });

            gsap.to(this.DOM.sidemenuLinks, {
                duration: action === 'open' ? 0.5 : 0.2,
                ease: action === 'open' ? "power3.inOut" : "power3.in",
                startAt: action === 'open' ? {y: '100%'} : null,
                y: action === 'open' ? '0%' : '100%',
                stagger: action === 'open' ? 0.05 : -0.05
            });

            if (this.DOM.menulink) {
                gsap.to(this.DOM.menulink, {
                    duration: action === 'open' ? 0.9 : 0.6,
                    ease: action === 'open' ? "power3.inOut" : "power3.in",
                    startAt: action === 'open' ? {x: '10%'} : null,
                    x: action === 'open' ? '0%' : '10%'
                });
            }
        }
    }

    class TiltFx {
        constructor() {
            this.DOM = {main: document.querySelector('.background')};
            this.layersTotal = 4;
            this.layout();
            this.initEvents();
        }

        layout() {
            let inner = '';
            for (let i = 0; i < this.layersTotal; ++i) {
                inner += '<div class="background__copy"></div>';
            }
            this.DOM.main.innerHTML = inner;
            this.DOM.layers = Array.from(this.DOM.main.querySelectorAll('.background__copy'));
        }

        initEvents() {
            this.mousemoveFn = ev => requestAnimationFrame(() => this.tilt(ev));
            document.body.addEventListener('mousemove', this.mousemoveFn);
        }

        tilt(ev) {
            if (!allowTilt) return;
            const mousepos = getMousePos(ev);
            const bounds = this.DOM.main.getBoundingClientRect();
            const relmousepos = {
                x : (mousepos.x - bounds.left) / bounds.width,
                y : (mousepos.y - bounds.top) / bounds.height
            };
            this.DOM.layers.forEach((layer, pos) => {
                const totalMovement = (pos + 1) * 30;
                const rotationX = relmousepos.y * 2 - 1;
                const rotationY = relmousepos.x * 2 - 1;
                gsap.to(layer, {
                    duration: 1.2,
                    ease: 'power3.out',
                    x: rotationY * totalMovement,
                    y: rotationX * totalMovement,
                    rotationX: rotationX * 5,
                    rotationY: rotationY * 5,
                    scale: 1 + (pos * 0.05)
                });
            });
        }
    }

    const getMousePos = (ev) => {
        return {
            x : ev.clientX,
            y : ev.clientY
        };
    }

    const menu = new Menu(document.querySelector('nav.menu'));
    const tilt = new TiltFx();

    imagesLoaded(document.querySelector('.background'), {background: true}, () => {
        document.body.classList.remove('loading');
        document.body.classList.add('loaded');
    });

    function showFeatures() {
        menu.showSection('features');
        console.log('Showing features');
        document.getElementById('features').classList.remove('hidden');
        document.getElementById('blog').classList.add('hidden');
        document.getElementById('faq').classList.add('hidden');
        // Implement feature showcase logic with dynamic content loading
    }

    function showBlog() {
        console.log('Showing blog');
        document.getElementById('blog').classList.remove('hidden');
        document.getElementById('features').classList.add('hidden');
        document.getElementById('faq').classList.add('hidden');
        // Implement blog loading logic with dynamic content loading
    }

    function showScreenshots() {
        menu.showSection('screenshots');
        console.log('Showing screenshots');
        // Implement screenshot gallery logic
    }

    function initiateDownload() {
        menu.showSection('downloads');
        console.log('Initiating download');
        // Implement download logic
    }

    function showAbout() {
        menu.showSection('about');
        console.log('Showing about information');
        // Implement about section logic
    }

    function showOneClickInstall() {
        console.log('Showing one-click install info');
        // Implement one-click install showcase
    }

    function showExtensiveLibrary() {
        console.log('Showing extensive library');
        // Implement library showcase
    }

    function showAutoUpdates() {
        console.log('Showing auto-updates info');
        // Implement auto-updates info
    }

    function showUserFriendly() {
        console.log('Showing user-friendly features');
        // Implement user-friendly features showcase
    }

    function showCompatibilityCheck() {
        console.log('Showing compatibility check');
        // Implement compatibility check logic
    }

    function showBackupRestore() {
        console.log('Showing backup & restore info');
        // Implement backup & restore info
    }

    function handleMenuLink() {
        console.log('Handling menu link click');
        // Implement menu link action
    }

    setTimeout(() => {
        document.body.classList.remove('loading');
        document.body.classList.add('loaded');
    }, 5000);
});


