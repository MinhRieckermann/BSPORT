
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, 2012 and Azure
-- --------------------------------------------------
-- Date Created: 04/10/2020 10:52:21
-- Generated from EDMX file: D:\TFS_BsportteamMinh\BSportTeam\SharedCode\BSportProject\BSportProject.Core\Models\Entity\BSportData.edmx
-- --------------------------------------------------

SET QUOTED_IDENTIFIER OFF;
GO
USE [BSportTeamDB];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[FK_dbo_AspNetUserClaims_dbo_AspNetUsers_UserId]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[AspNetUserClaims] DROP CONSTRAINT [FK_dbo_AspNetUserClaims_dbo_AspNetUsers_UserId];
GO
IF OBJECT_ID(N'[dbo].[FK_dbo_AspNetUserLogins_dbo_AspNetUsers_UserId]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[AspNetUserLogins] DROP CONSTRAINT [FK_dbo_AspNetUserLogins_dbo_AspNetUsers_UserId];
GO
IF OBJECT_ID(N'[dbo].[FK_dbo_AspNetUserRoles_dbo_AspNetRoles_RoleId]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[AspNetUserRoles] DROP CONSTRAINT [FK_dbo_AspNetUserRoles_dbo_AspNetRoles_RoleId];
GO
IF OBJECT_ID(N'[dbo].[FK_dbo_AspNetUserRoles_dbo_AspNetUsers_UserId]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[AspNetUserRoles] DROP CONSTRAINT [FK_dbo_AspNetUserRoles_dbo_AspNetUsers_UserId];
GO

-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[__MigrationHistory]', 'U') IS NOT NULL
    DROP TABLE [dbo].[__MigrationHistory];
GO
IF OBJECT_ID(N'[dbo].[Account]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Account];
GO
IF OBJECT_ID(N'[dbo].[AspNetRoles]', 'U') IS NOT NULL
    DROP TABLE [dbo].[AspNetRoles];
GO
IF OBJECT_ID(N'[dbo].[AspNetUserClaims]', 'U') IS NOT NULL
    DROP TABLE [dbo].[AspNetUserClaims];
GO
IF OBJECT_ID(N'[dbo].[AspNetUserLogins]', 'U') IS NOT NULL
    DROP TABLE [dbo].[AspNetUserLogins];
GO
IF OBJECT_ID(N'[dbo].[AspNetUserRoles]', 'U') IS NOT NULL
    DROP TABLE [dbo].[AspNetUserRoles];
GO
IF OBJECT_ID(N'[dbo].[AspNetUsers]', 'U') IS NOT NULL
    DROP TABLE [dbo].[AspNetUsers];
GO
IF OBJECT_ID(N'[dbo].[AvatarImage]', 'U') IS NOT NULL
    DROP TABLE [dbo].[AvatarImage];
GO
IF OBJECT_ID(N'[dbo].[BackgroundImage]', 'U') IS NOT NULL
    DROP TABLE [dbo].[BackgroundImage];
GO
IF OBJECT_ID(N'[dbo].[Function]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Function];
GO
IF OBJECT_ID(N'[dbo].[FunctionFeature]', 'U') IS NOT NULL
    DROP TABLE [dbo].[FunctionFeature];
GO
IF OBJECT_ID(N'[dbo].[Gender]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Gender];
GO
IF OBJECT_ID(N'[dbo].[Image]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Image];
GO
IF OBJECT_ID(N'[dbo].[PlayerTeam]', 'U') IS NOT NULL
    DROP TABLE [dbo].[PlayerTeam];
GO
IF OBJECT_ID(N'[dbo].[PositionPlay]', 'U') IS NOT NULL
    DROP TABLE [dbo].[PositionPlay];
GO
IF OBJECT_ID(N'[dbo].[Post]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Post];
GO
IF OBJECT_ID(N'[dbo].[Queue]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Queue];
GO
IF OBJECT_ID(N'[dbo].[Roles]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Roles];
GO
IF OBJECT_ID(N'[dbo].[Schedule]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Schedule];
GO
IF OBJECT_ID(N'[dbo].[ScheduleBook]', 'U') IS NOT NULL
    DROP TABLE [dbo].[ScheduleBook];
GO
IF OBJECT_ID(N'[dbo].[SportProfile]', 'U') IS NOT NULL
    DROP TABLE [dbo].[SportProfile];
GO
IF OBJECT_ID(N'[dbo].[TeamSport]', 'U') IS NOT NULL
    DROP TABLE [dbo].[TeamSport];
GO
IF OBJECT_ID(N'[dbo].[Time]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Time];
GO
IF OBJECT_ID(N'[mst].[City]', 'U') IS NOT NULL
    DROP TABLE [mst].[City];
GO
IF OBJECT_ID(N'[mst].[Country]', 'U') IS NOT NULL
    DROP TABLE [mst].[Country];
GO
IF OBJECT_ID(N'[mst].[Sport]', 'U') IS NOT NULL
    DROP TABLE [mst].[Sport];
GO
IF OBJECT_ID(N'[mst].[Stadium]', 'U') IS NOT NULL
    DROP TABLE [mst].[Stadium];
GO
IF OBJECT_ID(N'[mst].[Stadium_Schedule]', 'U') IS NOT NULL
    DROP TABLE [mst].[Stadium_Schedule];
GO
IF OBJECT_ID(N'[mst].[Stadium_Value]', 'U') IS NOT NULL
    DROP TABLE [mst].[Stadium_Value];
GO

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'Functions'
CREATE TABLE [dbo].[Functions] (
    [AccountId] int  NOT NULL,
    [RoleId] int  NOT NULL,
    [FeatureId] int  NOT NULL,
    [Create] bit  NULL,
    [Update] bit  NULL,
    [Delete] bit  NULL,
    [FullControl] bit  NULL,
    [CreateBy] varchar(50)  NULL,
    [CreateTime] datetime  NULL,
    [UpdateBy] varchar(50)  NULL,
    [UpdateTime] datetime  NULL,
    [DeleteFlag] bit  NULL
);
GO

-- Creating table 'FunctionFeatures'
CREATE TABLE [dbo].[FunctionFeatures] (
    [FeatureId] int  NOT NULL,
    [FeatureName] varchar(50)  NULL,
    [Active] bit  NULL,
    [CreateTime] datetime  NULL,
    [CreateBy] varchar(50)  NULL,
    [UpdateTime] datetime  NULL,
    [UpdateBy] varchar(50)  NULL
);
GO

-- Creating table 'Images'
CREATE TABLE [dbo].[Images] (
    [ImageId] bigint  NOT NULL,
    [ImagePath] varchar(max)  NULL
);
GO

-- Creating table 'PlayerTeams'
CREATE TABLE [dbo].[PlayerTeams] (
    [AccountId] int  NOT NULL,
    [TeamId] int  NOT NULL,
    [RoleId] int  NOT NULL,
    [CreateBy] varchar(50)  NULL,
    [CreateTime] datetime  NULL,
    [UpdateBy] varchar(50)  NULL,
    [UpdateTime] datetime  NULL
);
GO

-- Creating table 'Queues'
CREATE TABLE [dbo].[Queues] (
    [QueueId] bigint  NOT NULL,
    [AccountId] int  NULL,
    [CreateTime] datetime  NULL,
    [Createby] nchar(10)  NULL
);
GO

-- Creating table 'Roles'
CREATE TABLE [dbo].[Roles] (
    [RoleId] int  NOT NULL,
    [RoleName] varchar(50)  NULL,
    [Active] bit  NULL,
    [CreateTime] datetime  NULL,
    [CreateBy] varchar(50)  NULL,
    [UpdateTime] datetime  NULL,
    [UpdateBy] varchar(50)  NULL
);
GO

-- Creating table 'Schedules'
CREATE TABLE [dbo].[Schedules] (
    [DateId] int  NOT NULL,
    [DateValue] datetime  NULL
);
GO

-- Creating table 'ScheduleBooks'
CREATE TABLE [dbo].[ScheduleBooks] (
    [ScheduleBookId] int  NOT NULL,
    [DateId] int  NULL,
    [TimeId] int  NULL,
    [Team1] int  NULL,
    [Team2] int  NULL,
    [StadiumId] int  NULL,
    [HostId] int  NULL,
    [Active] bit  NULL,
    [CreateBy] varchar(50)  NULL,
    [CreateTime] datetime  NULL,
    [UpdateBy] varchar(50)  NULL,
    [UpdateTime] datetime  NULL
);
GO

-- Creating table 'TeamSports'
CREATE TABLE [dbo].[TeamSports] (
    [TeamId] int  NOT NULL,
    [TeamName] nchar(10)  NULL,
    [OwnerId] int  NULL,
    [Description] nvarchar(1000)  NULL,
    [Image_url] nvarchar(1000)  NULL,
    [SportId] int  NULL,
    [CreateTime] datetime  NULL,
    [CreateBy] varchar(50)  NULL,
    [UpdateTime] datetime  NULL,
    [UpdateBy] varchar(50)  NULL,
    [GenderTeam] smallint  NULL,
    [FromAge] int  NULL,
    [ToAge] int  NULL
);
GO

-- Creating table 'Times'
CREATE TABLE [dbo].[Times] (
    [TimeId] int  NOT NULL,
    [time1] time  NULL
);
GO

-- Creating table 'AccountTeamplayers'
CREATE TABLE [dbo].[AccountTeamplayers] (
    [TeamId] int  NOT NULL,
    [AccountId] int  NOT NULL
);
GO

-- Creating table 'AspNetRoles'
CREATE TABLE [dbo].[AspNetRoles] (
    [Id] nvarchar(128)  NOT NULL,
    [Name] nvarchar(256)  NOT NULL
);
GO

-- Creating table 'AspNetUserClaims'
CREATE TABLE [dbo].[AspNetUserClaims] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [UserId] nvarchar(128)  NOT NULL,
    [ClaimType] nvarchar(max)  NULL,
    [ClaimValue] nvarchar(max)  NULL
);
GO

-- Creating table 'AspNetUserLogins'
CREATE TABLE [dbo].[AspNetUserLogins] (
    [LoginProvider] nvarchar(128)  NOT NULL,
    [ProviderKey] nvarchar(128)  NOT NULL,
    [UserId] nvarchar(128)  NOT NULL
);
GO

-- Creating table 'AspNetUsers'
CREATE TABLE [dbo].[AspNetUsers] (
    [Id] nvarchar(128)  NOT NULL,
    [Email] nvarchar(256)  NULL,
    [EmailConfirmed] bit  NOT NULL,
    [PasswordHash] nvarchar(max)  NULL,
    [SecurityStamp] nvarchar(max)  NULL,
    [PhoneNumber] nvarchar(max)  NULL,
    [PhoneNumberConfirmed] bit  NOT NULL,
    [TwoFactorEnabled] bit  NOT NULL,
    [LockoutEndDateUtc] datetime  NULL,
    [LockoutEnabled] bit  NOT NULL,
    [AccessFailedCount] int  NOT NULL,
    [UserName] nvarchar(256)  NOT NULL
);
GO

-- Creating table 'Posts'
CREATE TABLE [dbo].[Posts] (
    [Id] bigint  NOT NULL,
    [AccountId] int  NULL,
    [TeamId] int  NULL,
    [Postcontent] nvarchar(max)  NULL,
    [Createtime] datetime  NULL,
    [Createby] varchar(50)  NULL,
    [Updatetime] datetime  NULL,
    [Updateby] varchar(50)  NULL
);
GO

-- Creating table 'C__MigrationHistory'
CREATE TABLE [dbo].[C__MigrationHistory] (
    [MigrationId] nvarchar(150)  NOT NULL,
    [ContextKey] nvarchar(300)  NOT NULL,
    [Model] varbinary(max)  NOT NULL,
    [ProductVersion] nvarchar(32)  NOT NULL
);
GO

-- Creating table 'Genders'
CREATE TABLE [dbo].[Genders] (
    [Id] int  NOT NULL,
    [Gender_Name] nvarchar(50)  NULL,
    [Description] nchar(10)  NULL
);
GO

-- Creating table 'PositionPlays'
CREATE TABLE [dbo].[PositionPlays] (
    [Id] int  NOT NULL,
    [PositionName] nvarchar(100)  NULL,
    [Description] nvarchar(1000)  NULL,
    [SportID] int  NULL
);
GO

-- Creating table 'Cities'
CREATE TABLE [dbo].[Cities] (
    [CityId] int  NOT NULL,
    [Name] varchar(50)  NULL,
    [Address] nvarchar(1000)  NULL,
    [Active] bit  NULL,
    [CreateTime] datetime  NULL,
    [CreateBy] varchar(50)  NULL,
    [UpdateTime] datetime  NULL,
    [UpdateBy] varchar(50)  NULL,
    [DeleteFlag] bit  NULL
);
GO

-- Creating table 'Countries'
CREATE TABLE [dbo].[Countries] (
    [CountryId] int  NOT NULL,
    [Name] varchar(50)  NULL,
    [Active] bit  NULL,
    [CreateTime] datetime  NULL,
    [CreateBy] varchar(50)  NULL,
    [UpdateTime] datetime  NULL,
    [UpdateBy] varchar(50)  NULL,
    [DeleteFlag] bit  NULL
);
GO

-- Creating table 'Sports'
CREATE TABLE [dbo].[Sports] (
    [Id] int  NOT NULL,
    [SportName] varchar(50)  NULL,
    [CountryId] nvarchar(1000)  NULL,
    [Active] bit  NULL,
    [CreateTime] datetime  NULL,
    [CreateBy] varchar(50)  NULL,
    [UpdateTime] datetime  NULL,
    [UpdateBy] varchar(50)  NULL,
    [DeleteFlag] bit  NULL,
    [Maximum] int  NULL,
    [Minimum] int  NULL
);
GO

-- Creating table 'Stadia'
CREATE TABLE [dbo].[Stadia] (
    [StadiumId] int  NOT NULL,
    [StadiumName] nvarchar(50)  NULL,
    [Address] nvarchar(max)  NULL,
    [Phone] nvarchar(50)  NULL,
    [ImageId] int  NULL,
    [HostId] int  NOT NULL,
    [Status] char(1)  NULL,
    [CreateTime] datetime  NULL,
    [CreateBy] varchar(50)  NULL,
    [UpdateTime] datetime  NULL,
    [UpdateBy] varchar(50)  NULL
);
GO

-- Creating table 'Stadium_Schedule'
CREATE TABLE [dbo].[Stadium_Schedule] (
    [Stadium_ValueId] int  NOT NULL,
    [Time] int  NOT NULL,
    [Status] char(1)  NOT NULL,
    [CreateTime] datetime  NULL,
    [CreateBy] varchar(50)  NULL,
    [UpdateTime] datetime  NULL,
    [UpdateBy] varchar(50)  NULL
);
GO

-- Creating table 'Stadium_Value'
CREATE TABLE [dbo].[Stadium_Value] (
    [StadiumId] int  NOT NULL,
    [Stadium_ValueId] int  NOT NULL,
    [Status] bit  NOT NULL,
    [CreateTime] datetime  NULL,
    [CreateBy] varchar(50)  NULL,
    [UpdateTime] datetime  NULL,
    [UpdateBy] varchar(50)  NULL
);
GO

-- Creating table 'AvatarImages'
CREATE TABLE [dbo].[AvatarImages] (
    [AvatarId] int IDENTITY(1,1) NOT NULL,
    [UserId] int  NOT NULL,
    [Path] int  NULL
);
GO

-- Creating table 'BackgroundImages'
CREATE TABLE [dbo].[BackgroundImages] (
    [ImageId] int  NOT NULL,
    [UserId] int  NOT NULL,
    [Path] nvarchar(1000)  NOT NULL
);
GO

-- Creating table 'Accounts'
CREATE TABLE [dbo].[Accounts] (
    [AccountId] int IDENTITY(1,1) NOT NULL,
    [AccountName] nvarchar(50)  NULL,
    [Address] nvarchar(1000)  NULL,
    [BirthDay] datetime  NULL,
    [Desc] nvarchar(max)  NULL,
    [Email] nvarchar(50)  NULL,
    [Mobile] nvarchar(50)  NULL,
    [GenderId] bit  NULL,
    [CreateTime] datetime  NULL,
    [CreateBy] varchar(50)  NULL,
    [UpdateTime] datetime  NULL,
    [UpdateBy] varchar(50)  NULL,
    [isUpdate] bit  NULL
);
GO

-- Creating table 'SportProfiles'
CREATE TABLE [dbo].[SportProfiles] (
    [ProfileID] int IDENTITY(1,1) NOT NULL,
    [PosplayId] int  NOT NULL,
    [SportId] int  NOT NULL,
    [UserId] int  NOT NULL,
    [Experience] int  NOT NULL,
    [Description] nvarchar(1000)  NULL,
    [DateCreated] nvarchar(50)  NULL
);
GO

-- Creating table 'AspNetUserRoles'
CREATE TABLE [dbo].[AspNetUserRoles] (
    [AspNetRoles_Id] nvarchar(128)  NOT NULL,
    [AspNetUsers_Id] nvarchar(128)  NOT NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [AccountId], [RoleId], [FeatureId] in table 'Functions'
ALTER TABLE [dbo].[Functions]
ADD CONSTRAINT [PK_Functions]
    PRIMARY KEY CLUSTERED ([AccountId], [RoleId], [FeatureId] ASC);
GO

-- Creating primary key on [FeatureId] in table 'FunctionFeatures'
ALTER TABLE [dbo].[FunctionFeatures]
ADD CONSTRAINT [PK_FunctionFeatures]
    PRIMARY KEY CLUSTERED ([FeatureId] ASC);
GO

-- Creating primary key on [ImageId] in table 'Images'
ALTER TABLE [dbo].[Images]
ADD CONSTRAINT [PK_Images]
    PRIMARY KEY CLUSTERED ([ImageId] ASC);
GO

-- Creating primary key on [AccountId], [TeamId] in table 'PlayerTeams'
ALTER TABLE [dbo].[PlayerTeams]
ADD CONSTRAINT [PK_PlayerTeams]
    PRIMARY KEY CLUSTERED ([AccountId], [TeamId] ASC);
GO

-- Creating primary key on [QueueId] in table 'Queues'
ALTER TABLE [dbo].[Queues]
ADD CONSTRAINT [PK_Queues]
    PRIMARY KEY CLUSTERED ([QueueId] ASC);
GO

-- Creating primary key on [RoleId] in table 'Roles'
ALTER TABLE [dbo].[Roles]
ADD CONSTRAINT [PK_Roles]
    PRIMARY KEY CLUSTERED ([RoleId] ASC);
GO

-- Creating primary key on [DateId] in table 'Schedules'
ALTER TABLE [dbo].[Schedules]
ADD CONSTRAINT [PK_Schedules]
    PRIMARY KEY CLUSTERED ([DateId] ASC);
GO

-- Creating primary key on [ScheduleBookId] in table 'ScheduleBooks'
ALTER TABLE [dbo].[ScheduleBooks]
ADD CONSTRAINT [PK_ScheduleBooks]
    PRIMARY KEY CLUSTERED ([ScheduleBookId] ASC);
GO

-- Creating primary key on [TeamId] in table 'TeamSports'
ALTER TABLE [dbo].[TeamSports]
ADD CONSTRAINT [PK_TeamSports]
    PRIMARY KEY CLUSTERED ([TeamId] ASC);
GO

-- Creating primary key on [TimeId] in table 'Times'
ALTER TABLE [dbo].[Times]
ADD CONSTRAINT [PK_Times]
    PRIMARY KEY CLUSTERED ([TimeId] ASC);
GO

-- Creating primary key on [TeamId], [AccountId] in table 'AccountTeamplayers'
ALTER TABLE [dbo].[AccountTeamplayers]
ADD CONSTRAINT [PK_AccountTeamplayers]
    PRIMARY KEY CLUSTERED ([TeamId], [AccountId] ASC);
GO

-- Creating primary key on [Id] in table 'AspNetRoles'
ALTER TABLE [dbo].[AspNetRoles]
ADD CONSTRAINT [PK_AspNetRoles]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'AspNetUserClaims'
ALTER TABLE [dbo].[AspNetUserClaims]
ADD CONSTRAINT [PK_AspNetUserClaims]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [LoginProvider], [ProviderKey], [UserId] in table 'AspNetUserLogins'
ALTER TABLE [dbo].[AspNetUserLogins]
ADD CONSTRAINT [PK_AspNetUserLogins]
    PRIMARY KEY CLUSTERED ([LoginProvider], [ProviderKey], [UserId] ASC);
GO

-- Creating primary key on [Id] in table 'AspNetUsers'
ALTER TABLE [dbo].[AspNetUsers]
ADD CONSTRAINT [PK_AspNetUsers]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Posts'
ALTER TABLE [dbo].[Posts]
ADD CONSTRAINT [PK_Posts]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [MigrationId], [ContextKey] in table 'C__MigrationHistory'
ALTER TABLE [dbo].[C__MigrationHistory]
ADD CONSTRAINT [PK_C__MigrationHistory]
    PRIMARY KEY CLUSTERED ([MigrationId], [ContextKey] ASC);
GO

-- Creating primary key on [Id] in table 'Genders'
ALTER TABLE [dbo].[Genders]
ADD CONSTRAINT [PK_Genders]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'PositionPlays'
ALTER TABLE [dbo].[PositionPlays]
ADD CONSTRAINT [PK_PositionPlays]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [CityId] in table 'Cities'
ALTER TABLE [dbo].[Cities]
ADD CONSTRAINT [PK_Cities]
    PRIMARY KEY CLUSTERED ([CityId] ASC);
GO

-- Creating primary key on [CountryId] in table 'Countries'
ALTER TABLE [dbo].[Countries]
ADD CONSTRAINT [PK_Countries]
    PRIMARY KEY CLUSTERED ([CountryId] ASC);
GO

-- Creating primary key on [Id] in table 'Sports'
ALTER TABLE [dbo].[Sports]
ADD CONSTRAINT [PK_Sports]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [StadiumId] in table 'Stadia'
ALTER TABLE [dbo].[Stadia]
ADD CONSTRAINT [PK_Stadia]
    PRIMARY KEY CLUSTERED ([StadiumId] ASC);
GO

-- Creating primary key on [Stadium_ValueId], [Time] in table 'Stadium_Schedule'
ALTER TABLE [dbo].[Stadium_Schedule]
ADD CONSTRAINT [PK_Stadium_Schedule]
    PRIMARY KEY CLUSTERED ([Stadium_ValueId], [Time] ASC);
GO

-- Creating primary key on [StadiumId], [Stadium_ValueId] in table 'Stadium_Value'
ALTER TABLE [dbo].[Stadium_Value]
ADD CONSTRAINT [PK_Stadium_Value]
    PRIMARY KEY CLUSTERED ([StadiumId], [Stadium_ValueId] ASC);
GO

-- Creating primary key on [AvatarId] in table 'AvatarImages'
ALTER TABLE [dbo].[AvatarImages]
ADD CONSTRAINT [PK_AvatarImages]
    PRIMARY KEY CLUSTERED ([AvatarId] ASC);
GO

-- Creating primary key on [ImageId] in table 'BackgroundImages'
ALTER TABLE [dbo].[BackgroundImages]
ADD CONSTRAINT [PK_BackgroundImages]
    PRIMARY KEY CLUSTERED ([ImageId] ASC);
GO

-- Creating primary key on [AccountId] in table 'Accounts'
ALTER TABLE [dbo].[Accounts]
ADD CONSTRAINT [PK_Accounts]
    PRIMARY KEY CLUSTERED ([AccountId] ASC);
GO

-- Creating primary key on [ProfileID] in table 'SportProfiles'
ALTER TABLE [dbo].[SportProfiles]
ADD CONSTRAINT [PK_SportProfiles]
    PRIMARY KEY CLUSTERED ([ProfileID] ASC);
GO

-- Creating primary key on [AspNetRoles_Id], [AspNetUsers_Id] in table 'AspNetUserRoles'
ALTER TABLE [dbo].[AspNetUserRoles]
ADD CONSTRAINT [PK_AspNetUserRoles]
    PRIMARY KEY CLUSTERED ([AspNetRoles_Id], [AspNetUsers_Id] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- Creating foreign key on [UserId] in table 'AspNetUserClaims'
ALTER TABLE [dbo].[AspNetUserClaims]
ADD CONSTRAINT [FK_dbo_AspNetUserClaims_dbo_AspNetUsers_UserId]
    FOREIGN KEY ([UserId])
    REFERENCES [dbo].[AspNetUsers]
        ([Id])
    ON DELETE CASCADE ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_dbo_AspNetUserClaims_dbo_AspNetUsers_UserId'
CREATE INDEX [IX_FK_dbo_AspNetUserClaims_dbo_AspNetUsers_UserId]
ON [dbo].[AspNetUserClaims]
    ([UserId]);
GO

-- Creating foreign key on [UserId] in table 'AspNetUserLogins'
ALTER TABLE [dbo].[AspNetUserLogins]
ADD CONSTRAINT [FK_dbo_AspNetUserLogins_dbo_AspNetUsers_UserId]
    FOREIGN KEY ([UserId])
    REFERENCES [dbo].[AspNetUsers]
        ([Id])
    ON DELETE CASCADE ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_dbo_AspNetUserLogins_dbo_AspNetUsers_UserId'
CREATE INDEX [IX_FK_dbo_AspNetUserLogins_dbo_AspNetUsers_UserId]
ON [dbo].[AspNetUserLogins]
    ([UserId]);
GO

-- Creating foreign key on [AspNetRoles_Id] in table 'AspNetUserRoles'
ALTER TABLE [dbo].[AspNetUserRoles]
ADD CONSTRAINT [FK_AspNetUserRoles_AspNetRole]
    FOREIGN KEY ([AspNetRoles_Id])
    REFERENCES [dbo].[AspNetRoles]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating foreign key on [AspNetUsers_Id] in table 'AspNetUserRoles'
ALTER TABLE [dbo].[AspNetUserRoles]
ADD CONSTRAINT [FK_AspNetUserRoles_AspNetUser]
    FOREIGN KEY ([AspNetUsers_Id])
    REFERENCES [dbo].[AspNetUsers]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_AspNetUserRoles_AspNetUser'
CREATE INDEX [IX_FK_AspNetUserRoles_AspNetUser]
ON [dbo].[AspNetUserRoles]
    ([AspNetUsers_Id]);
GO

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------