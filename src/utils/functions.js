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

    return date.getFullYear() || null;
};

export const getLanguage = (resultJSON, languages) => {
    if (!resultJSON.original_language) return;

    return languages.find(language => language.iso_639_1 === resultJSON.original_language).english_name;
};

export const getHoursAndMinutes = minutes => {
    const hours = Math.floor(minutes / 60);
    const min = minutes % 60;

    return `${hours} h ${min} min`;
};

export const getVideoUrl = (videoData) => {
    switch (videoData.site.toLowerCase()) {
        case 'youtube':
            return `https://www.youtube.com/embed/${videoData.key}?controls=1`;
        case 'vimeo':
            return `https://player.vimeo.com/video/${videoData.key}`;
        default:
            return null;
    }
};
