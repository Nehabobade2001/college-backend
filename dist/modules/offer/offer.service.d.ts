import { Paginated, PaginateQuery } from 'nestjs-paginate';
import { Repository } from 'typeorm';
import { OfferStatusDto, CreateOfferDto, UpdateOfferDto } from './offer.dto';
import { Offer } from '@/entities/Offer';
export declare class OfferService {
    private OfferRepository;
    constructor(OfferRepository: Repository<Offer>);
    create(OfferData: CreateOfferDto): Promise<Offer>;
    listWithPagination(query: PaginateQuery): Promise<Paginated<Offer>>;
    findById(id: number): Promise<Offer>;
    update(OfferData: UpdateOfferDto): Promise<Offer>;
    delete(ids: number | number[]): Promise<boolean>;
    hardDelete(ids: number | number[]): Promise<boolean>;
    restore(ids: number | number[]): Promise<void>;
    listTrashedWithPagination(query: PaginateQuery): Promise<Paginated<Offer>>;
    enableOffer(data: OfferStatusDto): Promise<Offer[]>;
    dropdown(query: PaginateQuery): Promise<Paginated<Offer>>;
}
