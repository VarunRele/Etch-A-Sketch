let square_btn = document.querySelector(".square")
let refresh_btn = document.querySelector(".refresh")
let random_btn = document.querySelector(".random")
let box_color = {}
let num_of_squares = 10
let color_change_rate = 20
let random_color = false

square_btn.addEventListener("click", (e) => {
    let temp = prompt("Enter a number. Can't be greater than 100.", "10")
    num_of_squares = parseInt(temp)

    if (temp <= 100 && temp > 0) {
        destroy_grid()
        create_grid(num_of_squares)
    }
})

refresh_btn.addEventListener("click", (e) => {
    destroy_grid()
    create_grid(num_of_squares)
})

random_btn.addEventListener("click", (e) => {
    if (random_color) {
        random_color = false
        random_btn.style.background = "white"
        random_btn.style.color = "black"
    } else {
        random_color = true
        random_btn.style.background = "blue"
        random_btn.style.color = "white"
    }
})

let get_color = () => {
    let red = Math.floor(Math.random() * 255)
    let green = Math.floor(Math.random() * 255)
    let blue = Math.floor(Math.random() * 255)
    return {
        color: `rgba(${red}, ${green}, ${blue}, 255)`, red, green, blue
}
}

let create_grid = (num_of_squares) => {
    w = 500 / num_of_squares
    for (let i = 0; i < (500/w)**2; i++) {
        let div = document.createElement("div")
        div.style.width = `${w}px`;
        div.setAttribute("class", "box")
        div.setAttribute("id", i)
        document.getElementById("con").appendChild(div)

        div.addEventListener("mouseenter", (e) => {
            if (e.target.id in box_color) {
                if (box_color[e.target.id].red > 0)
                    box_color[e.target.id].red -= color_change_rate
                let red = box_color[e.target.id].red

                if (box_color[e.target.id].green > 0)
                    box_color[e.target.id].green -= color_change_rate
                let green = box_color[e.target.id].green

                if (box_color[e.target.id].blue > 0)
                    box_color[e.target.id].blue -= color_change_rate
                let blue = box_color[e.target.id].blue

                box_color[e.target.id].color = `rgba(${red}, ${green}, ${blue}, 255)`
                e.target.style.background = box_color[e.target.id].color
            }
            else {
                if (random_color) {
                    let color = get_color()
                    box_color[e.target.id] = color
                } else {
                    box_color[e.target.id] = {
                        color: `rgba(0, 0, 0, 255)`, red: 0, green: 0, blue: 0
                    }
                }
                
                e.target.style.background = `${box_color[e.target.id].color}`
            }
        })
    }
}

let destroy_grid = () => {
    let boxes = document.querySelectorAll(".box")
    boxes.forEach(box => { box.remove() })
    box_color = {}
}

create_grid(num_of_squares)

