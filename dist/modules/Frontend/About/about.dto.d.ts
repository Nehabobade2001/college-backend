export declare class CreateAboutDto {
    title: string;
    description: string;
    imageUrl?: string;
    content?: string;
}
export declare class UpdateAboutDto extends CreateAboutDto {
    id: number;
}
