import { CenterService } from './center.service';
import { CreateCenterDto, UpdateCenterDto } from './center.dto';
export declare class CenterController {
    private readonly centerService;
    constructor(centerService: CenterService);
    list(): Promise<import("../../entities/Center").Center[]>;
    create(dto: CreateCenterDto, req: any): Promise<import("../../entities/Center").Center>;
    get(id: number): Promise<import("../../entities/Center").Center>;
    update(id: number, dto: UpdateCenterDto): Promise<import("../../entities/Center").Center>;
    deactivate(id: number): Promise<import("../../entities/Center").Center>;
    activate(id: number): Promise<import("../../entities/Center").Center>;
}
