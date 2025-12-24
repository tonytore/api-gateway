import Joi from 'joi';
export declare const idSchema: (value: string) => Joi.StringSchema<string>;
export declare const certificateNumberSchema: (value: string) => Joi.StringSchema<string>;
export declare const optIdSchema: (value: string) => Joi.StringSchema<string>;
export declare const phoneNumberSchema: (value: string) => Joi.StringSchema<string>;
export declare const emailSchema: (value: string) => Joi.StringSchema<string>;
export declare const address: Joi.StringSchema<string>;
export declare const timestamps: {
    createdAt: Joi.DateSchema<Date>;
    updatedAt: Joi.DateSchema<Date>;
};
export declare const gender: Joi.StringSchema<string>;
export declare const maritalStatus: Joi.StringSchema<string>;
export declare const cgpa: Joi.NumberSchema<number>;
export declare const currentYear: number;
export declare const grade: Joi.StringSchema<string>;
export declare const certificateStatus: Joi.StringSchema<string>;
export declare const jobType: Joi.StringSchema<string>;
