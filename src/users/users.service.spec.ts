import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersService', () => {
  let service: UsersService;
  let mockUsersRepository;

  beforeEach(async () => {
    mockUsersRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findByPk: jest.fn(),
      update: jest.fn(),
      destroy: jest.fn()
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: 'USERS_REPOSITORY', useValue: mockUsersRepository }
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Tests for create
  describe('create', () => {
    it('should successfully create a user', async () => {
      const createUserDto = new CreateUserDto();
      mockUsersRepository.create.mockResolvedValue(createUserDto);
      expect(await service.create(createUserDto)).toEqual(createUserDto);
      expect(mockUsersRepository.create).toHaveBeenCalledWith(createUserDto);
    });

    it('should throw an error when creating a user fails', async () => {
      const createUserDto = new CreateUserDto();
      mockUsersRepository.create.mockRejectedValue(new Error('Failed to create user'));
      await expect(service.create(createUserDto)).rejects.toThrow('Failed to create user');
    });
  });

  // Tests for findAll
  describe('findAll', () => {
    it('should return an array of users', async () => {
      const createUserDto = new CreateUserDto();
      const usersArray = [createUserDto];
      mockUsersRepository.findAll.mockResolvedValue(usersArray);
      expect(await service.findAll()).toEqual(usersArray);
      expect(mockUsersRepository.findAll).toHaveBeenCalled();
    });

    it('should throw an error when finding users fails', async () => {
      mockUsersRepository.findAll.mockRejectedValue(new Error('Failed to find users'));
      await expect(service.findAll()).rejects.toThrow('Failed to find users');
    });
  });

  // Tests for findOne
  describe('findOne', () => {
    it('should return a single user', async () => {
      const userId = 1;
      const createUserDto = new CreateUserDto();
      mockUsersRepository.findByPk.mockResolvedValue(createUserDto);
      expect(await service.findOne(userId)).toEqual(createUserDto);
      expect(mockUsersRepository.findByPk).toHaveBeenCalledWith(userId);
    });

    it('should throw an error when finding a user fails', async () => {
      const userId = 1;
      mockUsersRepository.findByPk.mockRejectedValue(new Error('Failed to find user'));
      await expect(service.findOne(userId)).rejects.toThrow('Failed to find user');
    });
  });

  // Tests for update
  describe('update', () => {
    it('should update a user successfully', async () => {
      const userId = 1;
      const updateUserDto = { firstname: 'Jane' };
      const affectedCount = 1;
      mockUsersRepository.update.mockResolvedValue([affectedCount]);
      expect(await service.update(userId, updateUserDto)).toEqual(affectedCount);
      expect(mockUsersRepository.update).toHaveBeenCalledWith(updateUserDto, { where: { id: userId } });
    });

    it('should throw an error when updating a user fails', async () => {
      const userId = 1;
      const updateUserDto = { firstname: 'Jane' };
      mockUsersRepository.update.mockRejectedValue(new Error('Failed to update user'));
      await expect(service.update(userId, updateUserDto)).rejects.toThrow('Failed to update user');
    });
  });

  // Tests for remove
  describe('remove', () => {
    it('should remove a user successfully', async () => {
      const userId = 1;
      const user = { id: userId, destroy: jest.fn() };
      mockUsersRepository.findByPk.mockResolvedValue(user);
      await service.remove(userId);
      expect(mockUsersRepository.findByPk).toHaveBeenCalledWith(userId);
      expect(user.destroy).toHaveBeenCalled();
    });

    it('should throw an error when removing a user fails', async () => {
      const userId = 1;
      mockUsersRepository.findByPk.mockRejectedValue(new Error('Failed to remove user'));
      await expect(service.remove(userId)).rejects.toThrow('Failed to remove user');
    });
  });


});
