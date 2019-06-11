export const getImageUrl = (imgConfigJSON, imagePath, imgSizeIndex) => {
    const baseUrl = `${imgConfigJSON.secure_base_url}${imgConfigJSON.poster_sizes[imgSizeIndex]}/`;
    const imageWidth = imgConfigJSON.poster_sizes[imgSizeIndex].substring(1);

    return imagePath ? `${baseUrl}${imagePath}` : `https://via.placeholder.com/${imageWidth}.jpg`;
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
