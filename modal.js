const Modal = {
    open() {
        const modal = document.getElementsByClassName("modal-overlay");
        modal[0].classList.add("active");
    },

    close(){
        const modal = document.getElementsByClassName("modal-overlay");
        modal[0].classList.remove("active");
    }
}