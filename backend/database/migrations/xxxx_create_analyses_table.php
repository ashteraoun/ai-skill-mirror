public function up(): void {
    Schema::create('analyses', function (Blueprint $table) {
        $table->id();
        $table->text('user_input');
        $table->string('category');
        $table->integer('talent_score');
        $table->string('title');
        $table->text('summary');
        $table->json('skills_json');
        $table->json('careers_json');
        $table->json('roadmap_json');
        $table->timestamps();
    });
}