export function parseStringAsArrayCommon(string: any) {
    return string.split(',').map((service: any) => service.trim());
}

export function parseStringAsArrayBar(string: any) {
    return string.split('/').map((service: any) => service.trim());
}

export function parseStringAsArraySpace(string: any) {
    return string.split(' ').map((service: any) => service.trim());
}

