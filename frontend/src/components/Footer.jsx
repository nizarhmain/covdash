import React from 'react'

export default function Footer() {
    return (
        <div class="flex justify-center m-5 md:m-10 mx-auto" href="https://github.com/nizarhmain/covdash">
            <div class="flex">
                <img style={{ height: "50px" }} src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" />
            </div>
            <div class="flex flex-col items-center justify-center">
                <a href="https://github.com/nizarhmain/covdash" className="text-blue-400">Feel free to contribute !</a>
                <p class="chat-notification-message">Nizar Hmain</p>
            </div>
        </div>


    )
}
