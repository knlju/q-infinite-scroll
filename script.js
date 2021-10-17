const unsplashAPIURL = "https://api.unsplash.com/"
const key = "ufJmpIaTjLVb4DMl-nRyrMOwa6a5hq5hGVAN5uRNuNo"
let pageNum = 1
let isLoading = false

const fetchImages = async () => {
    await new Promise(() => setTimeout(() => {}, 100000))
}

const fetchImagess = async () => {
    const res = await fetch(`${unsplashAPIURL}photos?client_id=${key}&page=${pageNum++}&per_page=20`)
    const data = await res.json()
    return data
}

const renderImages = data => {
    data.forEach(imageData => {
        const imageDiv = document.createElement("div")
        imageDiv.classList.add("image-container")
        const imageImg = document.createElement("img")
        imageImg.classList.add("image")
        imageImg.src = imageData.urls.thumb
        imageImg.alt = imageData.alt_description || "Image loaded using Unsplash API"
        imageDiv.appendChild(imageImg)
        document.querySelector("main").appendChild(imageDiv)
    })
}

const setLoading = loadingVal => {
    isLoading = loadingVal
    const loadingAnimated = document.querySelector(".loading") 
    loadingVal ? loadingAnimated.classList.add("show") : loadingAnimated.classList.remove("show")
}

const loadImages = async () => {
    setLoading(true)
    // const data = await setTimeout(3000, ()=>{})
    const data = await fetchImages()
    // renderImages(data)
    setLoading(false)
}

const handleScroll = () => {
    const docHeight = document.body.scrollHeight
    const currScrollHeight = window.scrollY + window.innerHeight
    // Load the next page approximately before the last row is scrolled to 
    const scrollTriggerModifier = 350
    const didScrollEnough = docHeight < currScrollHeight + scrollTriggerModifier
    if(didScrollEnough && !isLoading) {
        loadImages()
    }
}

const handleLoad = () => {
    loadImages()
}

document.addEventListener("scroll", handleScroll)

window.addEventListener("load", handleLoad)




