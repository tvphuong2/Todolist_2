import {PATH, getRequest, postRequest, getFile, postFile} from './api_chung'

export function dangNhap (email, matkhau, hanhdong) {
    return postRequest(PATH, hanhdong, {
        email: email,
        password: matkhau,
    })
}

export function dangKy (email, name, password, hanhdong) {
    return postRequest(`${PATH}/register`, hanhdong, {
        email: email,
        name: name,
        // image: image,
        password: password,
    })
}

export function layAnh(link) {
    var name = link.split("\\");
    name = name[name.length - 1]
    return PATH + "/img/" + name
}

export function APILayBanGhi (list_id, hanhdong) {
    return getRequest(`${PATH}/list/get_list?id=${list_id}`, hanhdong)
}

export function APILayBuoc (list_id, hanhdong) {
    return getRequest(`${PATH}/list/get_step?list_id=${list_id}`, hanhdong)
}

export function APILayBuocCon (step_id, sothutu, hanhdong) {
    return getRequest(`${PATH}/list/get_substep?step_id=${step_id}`, hanhdong)
}

export function APILayTatCa (hanhdong) {
    return getRequest(`${PATH}/search/getall`, hanhdong)
}

export function APITimKiem (tu_khoa, hanhdong) {
    return getRequest(`${PATH}/search?key=${tu_khoa}`, hanhdong)
}

export function APITimKiemTheLoai (type_id, hanhdong) {
    return getRequest(`${PATH}/search/bytype?type_id=${type_id}`, hanhdong)
}

export function APILayTacGia (tacgia_id, hanhdong) {
    return getRequest(`${PATH}/list/get_author?author_id=${tacgia_id}`, hanhdong)
}

export function APILayDanhGia (list_id, hanhdong) {
    return getRequest(`${PATH}/list/get_vote?list_id=${list_id}`, hanhdong)
}

export function APILayBinhLuan (list_id, hanhdong) {
    return getRequest(`${PATH}/list/get_comment?list_id=${list_id}`, hanhdong)
}

export function APIKiemTraThich (list_id, hanhdong) {
    return getRequest(`${PATH}/list/check_vote?list_id=${list_id}`, hanhdong)
}

export function APIThich (list_id, hanhdong) {
    return getRequest(`${PATH}/list/make_vote?list_id=${list_id}`, hanhdong)
}

export function APIBoThich (list_id, hanhdong) {
    return getRequest(`${PATH}/list/delete_vote?list_id=${list_id}`, hanhdong)
}

export function APILayAnh (name, hanhdong) {
    return getFile(`${PATH}/img/${name}`, hanhdong)
}

// export function APIXoaBanGhi (name, hanhdong) {
//     return getFile(`${PATH}/img/${name}`, hanhdong)
// }

export function APITimKiemTheoTacGia (user_id, hanhdong) {
    return getFile(`${PATH}/search/byauthor?account_id = ${user_id}`, hanhdong)
}

export function APITaoBanGhi(ban_ghi, hanhdong) {
    let formData = new FormData();
    formData.append("steps", ban_ghi.steps);
    formData.append("name", ban_ghi.name);
    formData.append("description", ban_ghi.description);
    formData.append("type_id", ban_ghi.type_id);
    formData.append("image", {uri: ban_ghi.image, name: 'image.png', type: 'image/png'});
    
    return postFile(`${PATH}/list/set_list`, hanhdong, formData);
}

export function APITaoBinhLuan (list_id, binh_luan, hanhdong) {
    return postRequest(`${PATH}/list/make_comment/`, hanhdong, {
        list_id: list_id,
        comment: binh_luan, 
    })
}

export function APITangLuotTaiVe (list_id, hanhdong) {
    return postRequest(`${PATH}/list/download`, hanhdong, {
        list_id: list_id,
    })
}

export function APILayTongTinTaiKhoan (hanhdong) {
    return getRequest(`${PATH}/search/getinfo`, hanhdong)
}

export function APILayThongTin (hanhdong) {
    return getRequest(`${PATH}/list/selfInfo`, hanhdong);
}

export function APIXoaBanGhi (hanhdong) {
    return getRequest(`${PATH}/list/delete_list`, hanhdong);
}

export function APIDoiAva (image, hanhdong) {
    let formData = new FormData();
    formData.append("image", {uri: image, name: 'image.png', type: 'image/png'});

    console.log(formData);
    return postFile(`${PATH}/list/changeava`, hanhdong, formData);
}

export function APIDoiUserName (user_id, name, hanhdong) {
    return postRequest(`${PATH}/list/changename`, hanhdong, {
        user_id: user_id,
        name: name,
    });
}