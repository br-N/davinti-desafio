-- DropForeignKey
ALTER TABLE "Telefone" DROP CONSTRAINT "Telefone_idContato_fkey";

-- AddForeignKey
ALTER TABLE "Telefone" ADD CONSTRAINT "Telefone_idContato_fkey" FOREIGN KEY ("idContato") REFERENCES "Contato"("id") ON DELETE CASCADE ON UPDATE CASCADE;
