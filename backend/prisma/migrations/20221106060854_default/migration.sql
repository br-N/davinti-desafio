-- DropForeignKey
ALTER TABLE "Telefone" DROP CONSTRAINT "Telefone_idContato_fkey";

-- AlterTable
ALTER TABLE "Telefone" ALTER COLUMN "idContato" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Telefone" ADD CONSTRAINT "Telefone_idContato_fkey" FOREIGN KEY ("idContato") REFERENCES "Contato"("id") ON DELETE SET NULL ON UPDATE CASCADE;
