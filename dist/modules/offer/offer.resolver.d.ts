import { ListInputDTO } from '@/common/paginationDto/withPagination';
import { Offer, OfferArray, PaginatedOffers } from '@/entities/Offer';
import { CreateOfferDto, OfferStatusDto, UpdateOfferDto } from './offer.dto';
import { OfferService } from './offer.service';
export declare class OfferResolver {
    private readonly OfferService;
    constructor(OfferService: OfferService);
    createOffer(createOfferInput: CreateOfferDto): Promise<Offer>;
    paginatedOffers(listInputDTO: ListInputDTO): Promise<PaginatedOffers>;
    findOfferById(id: number): Promise<Offer>;
    updateOffer(updateOfferInput: UpdateOfferDto): Promise<Offer>;
    changeOfferStatus(updateOfferStatusInput: OfferStatusDto): Promise<Offer | OfferArray>;
    deleteOffer(ids: number[]): Promise<boolean>;
    hardDeleteOffer(ids: number[]): Promise<boolean>;
    restoreOffer(ids: number[]): Promise<boolean>;
    trashedOffers(listInputDTO: ListInputDTO): Promise<PaginatedOffers>;
    dropdownOffers(listInputDTO: ListInputDTO): Promise<PaginatedOffers>;
}
