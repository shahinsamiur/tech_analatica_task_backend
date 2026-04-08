import { Injectable, BadRequestException } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { PrismaService } from '../../database/prisma.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(dto: SignupDto) {
    const { email, password } = dto;

    const existingUser: User | null = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.prisma.user.create({
      data: { email, password: hashedPassword },
    });

    const token = this.jwtService.sign({ userId: newUser.id, email });

    return {
      message: 'User created successfully',
      data: { id: newUser.id, email: newUser.email },
      token,
    };
  }

  async signin(dto: SigninDto) {
    const { email, password } = dto;

    const user: User | null = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new BadRequestException('Invalid credentials');
    }

    const token = this.jwtService.sign({ userId: user.id, email });

    return {
      message: 'Login successful',
      data: { id: user.id, email: user.email },
      token,
    };
  }
}
