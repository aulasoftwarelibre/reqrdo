<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200926233301 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE _user (id UUID NOT NULL, room_id UUID DEFAULT NULL, username VARCHAR(255) NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_D0B6A652F85E0677 ON _user (username)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_D0B6A652E7927C74 ON _user (email)');
        $this->addSql('CREATE INDEX IDX_D0B6A65254177093 ON _user (room_id)');
        $this->addSql('CREATE TABLE "check" (id UUID NOT NULL, room_id UUID NOT NULL, person_id UUID NOT NULL, in_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, out_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_3C8EAC1354177093 ON "check" (room_id)');
        $this->addSql('CREATE INDEX IDX_3C8EAC13217BBB47 ON "check" (person_id)');
        $this->addSql('CREATE TABLE room (id UUID NOT NULL, slug VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, capacity INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_729F519B989D9B62 ON room (slug)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_729F519B5E237E06 ON room (name)');
        $this->addSql('ALTER TABLE _user ADD CONSTRAINT FK_D0B6A65254177093 FOREIGN KEY (room_id) REFERENCES room (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE "check" ADD CONSTRAINT FK_3C8EAC1354177093 FOREIGN KEY (room_id) REFERENCES room (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE "check" ADD CONSTRAINT FK_3C8EAC13217BBB47 FOREIGN KEY (person_id) REFERENCES _user (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql("INSERT INTO room (id, name, slug, capacity) VALUES ('e1d742f5-4747-463a-8c0a-c8b3452c34a9', 'Aula de Software Libre', 'asl', 10)");
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE "check" DROP CONSTRAINT FK_3C8EAC13217BBB47');
        $this->addSql('ALTER TABLE _user DROP CONSTRAINT FK_D0B6A65254177093');
        $this->addSql('ALTER TABLE "check" DROP CONSTRAINT FK_3C8EAC1354177093');
        $this->addSql('DROP TABLE _user');
        $this->addSql('DROP TABLE "check"');
        $this->addSql('DROP TABLE room');
    }
}
