const keySounds = [
    new Audio('/sounds/keystroke1.mp3'),
    new Audio('/sounds/keystroke2.mp3'),
    new Audio('/sounds/keystroke3.mp3'),
    new Audio('/sounds/keystroke4.mp3')
];

const useKeyBoardSound = () => {

    const playSound = () => {
        const sound = keySounds[Math.floor(Math.random() * keySounds.length)];
        const clone = sound.cloneNode();
        clone.volume = 0.3;
        clone.play().catch(() => {}); // prevent crash
    };

    return { playSound };
};

export default useKeyBoardSound;