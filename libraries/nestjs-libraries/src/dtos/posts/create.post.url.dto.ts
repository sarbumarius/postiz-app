import {
  ArrayMinSize, IsArray, IsBoolean, IsDateString, IsDefined, IsIn, IsNumber, IsOptional, IsString, IsUrl, MinLength, Validate, ValidateIf, ValidateNested
} from 'class-validator';
import { Type } from 'class-transformer';
import { allProviders, type AllProvidersSettings, EmptySettings } from '@gitroom/nestjs-libraries/dtos/posts/providers-settings/all.providers.settings';
import { ValidContent } from '@gitroom/helpers/utils/valid.images';

export class Integration {
  @IsDefined()
  @IsString()
  id: string;
}

export class PostContentUrl {
  @IsDefined()
  @IsString()
  @Validate(ValidContent)
  content: string;

  @IsOptional()
  @IsString()
  id: string;

  @IsArray()
  @IsUrl({}, { each: true })
  imageUrls: string[];
}

export class PostUrl {
  @IsDefined()
  @Type(() => Integration)
  @ValidateNested()
  integration: Integration;

  @IsDefined()
  @ArrayMinSize(1)
  @IsArray()
  @Type(() => PostContentUrl)
  @ValidateNested({ each: true })
  value: PostContentUrl[];

  @IsOptional()
  @IsString()
  group: string;

  @ValidateNested()
  @Type(() => EmptySettings, {
    keepDiscriminatorProperty: true,
    discriminator: {
      property: '__type',
      subTypes: allProviders(EmptySettings),
    },
  })
  settings: AllProvidersSettings;
}

class Tags {
  @IsDefined()
  @IsString()
  value: string;

  @IsDefined()
  @IsString()
  label: string;
}

export class CreatePostUrlDto {
  @IsDefined()
  @IsIn(['draft', 'schedule', 'now'])
  type: 'draft' | 'schedule' | 'now';

  @IsOptional()
  @IsString()
  order?: string;

  @IsDefined()
  @IsBoolean()
  shortLink: boolean;

  @IsOptional()
  @IsNumber()
  inter?: number;

  @IsDefined()
  @IsDateString()
  date: string;

  @IsArray()
  @IsDefined()
  @ValidateNested({ each: true })
  tags: Tags[];

  @ValidateIf((o) => o.type !== 'draft')
  @IsDefined()
  @Type(() => PostUrl)
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  posts: PostUrl[];
}
