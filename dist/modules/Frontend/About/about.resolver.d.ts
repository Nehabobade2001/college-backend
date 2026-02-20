import { About } from '@/entities/About';
import { AboutService } from './about.service';
import { CreateAboutDto, UpdateAboutDto } from './about.dto';
export declare class AboutResolver {
    private readonly aboutService;
    constructor(aboutService: AboutService);
    getAllAbout(): Promise<About[]>;
    createAbout(data: CreateAboutDto): Promise<About>;
    getAboutById(id: number): Promise<About>;
    updateAbout(data: UpdateAboutDto): Promise<About>;
    deleteAbout(id: number): Promise<boolean>;
}
