/*
  Warnings:

  - Made the column `idContato` on table `Telefone` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Telefone" DROP CONSTRAINT "Telefone_idContato_fkey";

-- AlterTable
ALTER TABLE "Telefone" ALTER COLUMN "idContato" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Telefone" ADD CONSTRAINT "Telefone_idContato_fkey" FOREIGN KEY ("idContato") REFERENCES "Contato"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
