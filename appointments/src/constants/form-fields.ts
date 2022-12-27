const FIRST_NAME = 'firstName';
const SECOND_NAME = 'secondName';

export const FORM_FIELDS = {
    FIRST_NAME,
    SECOND_NAME
} as const;

export const htmlForInput = (id: string) => `${id}-input`;