import {PATH, getRequest, postRequest} from './api_chung'

export function dangNhap (email, matkhau, hanhdong) {
    return postRequest(PATH, hanhdong, {
        email: email,
        password: matkhau,
    })
}

export function APILayTatCa (hanhdong) {
    return getRequest(`${PATH}/local/getall`, hanhdong)
}

export function layAnh(link) {
    var name =link.split("\\")
    name = name[name.length - 1]
    return PATH + "/img/" + name
}

export function LayBangID (list_id, hanhdong) {
    return getRequest(`${PATH}/local/getbyid?${list_id}`, hanhdong)
}

export function Download (steps, image, name, description, hanhdong) {
    return postRequest(`${PATH}/local/download`, hanhdong, {
        steps: steps,
        image: image,
        name: name,
        description: description,
    })
}

export function Using (list_id, hanhdong) {
    return getRequest(`${PATH}/local/uselist?list_id=${list_id}`, hanhdong)
}

export function Cancel (list_id, hanhdong) {
    return getRequest(`${PATH}/local/cancel?list_id=${list_id}`, hanhdong)
}

export function XoaBanGhi (list_id, hanhdong) {
    return getRequest(`${PATH}/local/delete?list_id=${list_id}`, hanhdong)
}

export function DangSuDung (hanhdong) {
    return getRequest(`${PATH}/local/getprogress`, hanhdong)
}

export function ThayTienDo (list_id, progress, hanhdong) {
    return postRequest(`${PATH}/local/setprogress`, hanhdong, {
        list_id: list_id,
        progress: progress,
    })
}