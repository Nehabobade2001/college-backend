import { About } from '@/entities/About';
import { Repository } from 'typeorm';
import { CreateAboutDto, UpdateAboutDto } from './about.dto';
export declare class AboutService {
    private readonly aboutRepository;
    constructor(aboutRepository: Repository<About>);
    getAllAbout(): Promise<About[]>;
    create(data: CreateAboutDto): Promise<About>;
    getAboutById(id: number): Promise<About>;
    update(data: UpdateAboutDto): Promise<About>;
    deleteAbout(id: number): Promise<void>;
}
