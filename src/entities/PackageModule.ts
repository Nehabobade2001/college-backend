import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Package } from './Package';
import { ApplicationModule } from './Module';

@Entity('package_modules')
export class PackageModule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  packageId: number;

  @Column({ type: 'int' })
  moduleId: number;

  @ManyToOne(() => Package)
  package: Package;

  @ManyToOne(() => ApplicationModule)
  module: ApplicationModule;
}
