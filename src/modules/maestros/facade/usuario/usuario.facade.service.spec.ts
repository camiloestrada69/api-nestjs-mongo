import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioFacadeService } from './usuario.facade.service';

describe('UsuarioFacadeService', () => {
  let service: UsuarioFacadeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsuarioFacadeService],
    }).compile();

    service = module.get<UsuarioFacadeService>(UsuarioFacadeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
