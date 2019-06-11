export const getImageBaseUrl = (imgConfigJSON, imgSizeIndex) => {
    return imgConfigJSON && `${imgConfigJSON.secure_base_url}${imgConfigJSON.poster_sizes[imgSizeIndex]}/`
};

export const getImageUrl = (imagePath, baseImgUrl) => {
    return imagePath ? `${baseImgUrl}${imagePath}` : 'https://via.placeholder.com/154x231.jpg';
};

export const getTitle = resultJSON => {
    return resultJSON.name || resultJSON.original_name || resultJSON.title || resultJSON.original_title;
};

export const getYear = resultJSON => {
    const date = new Date(resultJSON.first_air_date || resultJSON.release_date);
    return date.getFullYear();
};

export const getLanguage = (resultJSON, languages) => {
    return languages.find(language => language.iso_639_1 === resultJSON.original_language).english_name;
};
