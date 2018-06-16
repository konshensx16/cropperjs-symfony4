import Cropper from 'cropperjs/dist/cropper'
import Routing from '../../vendor/friendsofsymfony/jsrouting-bundle/Resources/public/js/router'
import Routes from './routes.json'
import axios from 'axios'

Routing.setRoutingData(Routes)

let cropper;
var preview = document.getElementById('avatar')
var file_input = document.getElementById('profile_avatar')
window.previewFile  = function ()
{
    let file = file_input.files[0]
    let reader = new FileReader()

    reader.addEventListener('load', function (event)
    {
        preview.src = reader.result
    }, false)

    if (file)
    {
        reader.readAsDataURL(file)
    }
}

preview.addEventListener('load', function (event)
{
    cropper = new Cropper(preview, {
        aspectRatio: 1/1
    })
})

let form = document.getElementById('profile_form')
form.addEventListener('submit', function (event)
{
    event.preventDefault()
    cropper.getCroppedCanvas({
        maxHeight: 1000,
        maxWidth: 1000
    }).toBlob(function (blob)
    {
        ajaxWithAxios(blob)
    })
})

function ajaxWithAxios(blob)
{
    let url = Routing.generate('image')
    let data = new FormData(form)
    data.append('file', blob)
    axios({
        method: 'post',
        url: url,
        data: data,
        headers: {'X-Requested-With': 'XMLHttpRequest'}
    })
    .then((response) => {
        console.log(response)
    })
    .catch((error) => {
        console.error(error)
    })
}
