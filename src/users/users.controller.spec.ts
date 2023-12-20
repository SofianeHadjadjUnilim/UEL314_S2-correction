import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let mockUsersService;

  beforeEach(async () => {
    mockUsersService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn()
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: mockUsersService }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Tests for create
  describe('create', () => {
    it('should create a user successfully', async () => {
      const createUserDto = new CreateUserDto();
      mockUsersService.create.mockResolvedValue('someUser');
      expect(await controller.create(createUserDto)).toEqual('someUser');
      expect(mockUsersService.create).toHaveBeenCalledWith(createUserDto);
    });

    it('should throw an error when creating a user fails', async () => {
      const userDto = { firstname: 'John', lastname: 'Doe' };
      mockUsersService.create.mockRejectedValue(new Error('Failed to create user'));
      await expect(controller.create(userDto)).rejects.toThrow('Failed to create user');
    });
  });

  // Tests for findAll
  describe('findAll', () => {
    it('should return an array of users', async () => {
      mockUsersService.findAll.mockResolvedValue(['someUser']);
      expect(await controller.findAll()).toEqual(['someUser']);
      expect(mockUsersService.findAll).toHaveBeenCalled();
    });

    it('should handle errors when finding a user', async () => {
      mockUsersService.findAll.mockRejectedValue(new Error('Error finding user'));
      await expect(controller.findAll()).rejects.toThrow('Error finding user');
    });
  });

  // Tests for findOne
  describe('findOne', () => {
    it('should return a user', async () => {
      const userId = '1';
      mockUsersService.findOne.mockResolvedValue({ id: +userId });
      expect(await controller.findOne(userId)).toEqual({ id: +userId });
      expect(mockUsersService.findOne).toHaveBeenCalledWith(+userId);
    });

    it('should handle errors when finding a user', async () => {
      const userId = '1';
      mockUsersService.findOne.mockRejectedValue(new Error('Error finding user'));
      await expect(controller.findOne(userId)).rejects.toThrow('Error finding user');
    });
  });

  // Tests for update
  describe('update', () => {
    it('should update a user successfully', async () => {
      const userId = '1';
      const updateUserDto = new UpdateUserDto();
      mockUsersService.update.mockResolvedValue({ id: +userId, ...updateUserDto });
      expect(await controller.update(userId, updateUserDto)).toEqual({ id: +userId, ...updateUserDto });
      expect(mockUsersService.update).toHaveBeenCalledWith(+userId, updateUserDto);
    });

    it('should handle errors when updating a user', async () => {
      const userId = '1';
      const updateUserDto = new UpdateUserDto();
      mockUsersService.update.mockRejectedValue(new Error('Error updating user'));
      await expect(controller.update(userId, updateUserDto)).rejects.toThrow('Error updating user');
    });
  });

  // Tests for remove
  describe('remove', () => {
    it('should remove a user successfully', async () => {
      const userId = '1';
      mockUsersService.remove.mockResolvedValue();
      await controller.remove(userId);
      expect(mockUsersService.remove).toHaveBeenCalledWith(+userId);
    });

    it('should handle errors when removing a user', async () => {
      const userId = '1';
      mockUsersService.remove.mockRejectedValue(new Error('Error removing user'));
      await expect(controller.remove(userId)).rejects.toThrow('Error removing user');
    });
  });

});
