import { Test } from '@nestjs/testing';
import { DoctorModule } from './doctor.module';
import { DoctorResolver } from './doctor.resolver';
import { DoctorService } from './doctor.service';

describe('ThingsModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [DoctorModule],
    }).compile();

    expect(module).toBeDefined();
    expect(module.get(DoctorResolver)).toBeInstanceOf(DoctorResolver);
    expect(module.get(DoctorService)).toBeInstanceOf(DoctorService);
  });
});
