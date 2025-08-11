window.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    const header = document.querySelector('header');

    function toggleMobileNav() {
        document.getElementById("mobileMenu").classList.toggle("show")
    }

    window.toggleMobileNav = toggleMobileNav;

    function runInitialAnimations() {
        const onLoadTl = gsap.timeline({
            defaults: {
                ease: "power2.out"
            }
        })

        onLoadTl.to("header", {
            "--border-width": "100%",
            duration: 3,
        }, 0)

            .from(".desktop-nav a , .social-sidebar a", {
                y: -100,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power2.out"
            }, 0)

            .to(".social-sidebar", {
                "--border-height": "100%",
                duration: 10,
            }, 0)

            .to(".hero-content h1", {
                opacity: 1,
                duration: 1
            }, 0.2)

            .to('.hero-content h1', {
                delay: 0.5,
                duration: 1.2,
                color: "var(--sienna)",
                "-webkit-text-stroke": "0px var(--sienna)"
            }, 0.4)

            .from(".hero-content .line", {
                x: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.22,
                delay: 1,
                ease: "expo.out"
            }, 0.6)

            .to(".hero-bottle-wrapper", {
                opacity: 1,
                delay: 1.5,
                duration: 1.3,
                scale: 1,
                ease: "expo.out"
            }, 0.8)

            .to(".hero-stamp", {
                opacity: 1,
                scale: 1,
                delay: 2,
                duration: 0.2,
                ease: "back.out(3)"
            }, 1)

            .to(".hero-stamp", {
                y: "+=5",
                x: "-=3",
                repeat: 2,
                yoyo: true,
                ease: "power1.out",
                duration: 0.05,
            }, 1.2)
    }

    function pinAndAnimate({
        trigger,
        endTrigger,
        pin,
        animations,
        markers = false,
        headerOffSet = 0,
    }) {
        const end = `top top+=${headerOffSet}`;

        const tl = gsap.timeline({
            scrollTrigger:{
                trigger,
                start:`top top+=${headerOffSet}`,
                endTrigger,
                end,
                scrub:true,
                pin,
                pinSpacing:false,
                markers:markers,
                invalidateOnRefresh:true
            }
        })

        animations.forEach(({target , vars, postion = 0}) =>{
            tl.to(target, vars, postion)
        })
    }

    function setupScrollAnimations(){
        const headerOffSet = header.offsetHeight - 1;

        ScrollTrigger.matchMedia({
            "(min-width:769px)" : function(){
                pinAndAnimate({
                    trigger:".hero",
                    endTrigger:".section-intro",
                    pin:".hero-bottle-wrapper",
                    animations:[
                       { target:".hero-bottle", vars:{rotate : 0 , scale : 0.8}},
                    ],
                    headerOffSet
                });

                pinAndAnimate({
                    trigger:".section-intro",
                    endTrigger:".timeline-entry:nth-child(even)",
                    pin:".hero-bottle-wrapper",
                    animations:[
                        {target:".hero-bottle" , vars:{rotate:10 , scale:0.7}},
                        {target:".hero-bottle-wrapper" , vars:{x:"30%"}}
                    ],
                    headerOffSet
                })

                pinAndAnimate({
                    trigger:".timeline-entry:nth-child(even)",
                    endTrigger:".timeline-entry:nth-child(odd)",
                    pin:".hero-bottle-wrapper",
                    animations:[
                        {target:".hero-bottle" , vars:{rotate:-10 , scale:0.7}},
                        {target:".hero-bottle-wrapper" , vars:{x:"-25%"}}
                    ],
                    headerOffSet
                })
            },
            "(max-width:768px)": function(){
                gsap.to(".hero-bottle-wrapper" , {
                    opacity:1,
                    duration:1,
                    delay:0.5
                })
            }
        })
    }

    runInitialAnimations()
    setupScrollAnimations()

    ScrollTrigger.refresh()
})

