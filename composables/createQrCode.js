import qrcode from 'qrcode'

export const createQrCode = async (data) => {
    try {
        return await qrcode.toDataURL(data, {
            type: 'png',
            errorCorrectionLevel: 'H',
            margin: 1,
            width: 320,
            
        })
    } catch (error) {
        return error
    }
}