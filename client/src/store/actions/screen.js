export const SCREEN_SIZE = 'SCREEN_SIZE';

export const getScreenSize = (smallSize) => {
    return {
        type: SCREEN_SIZE,
        smallSize: smallSize
    };
};
